import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { Repository } from 'typeorm';
import { ItemPedido } from '../itens/item.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido-dto';
import { PedidosKafkaService } from './kafka/pedidos.kafka';
import { PedidosSearchService } from './search/pedidos.search';

@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(Pedido)
        private pedidosRepository: Repository<Pedido>,
        @InjectRepository(ItemPedido)
        private itensRepository: Repository<ItemPedido>,
        private searchService: PedidosSearchService,
        private kafkaService: PedidosKafkaService,
    ) { }

    async create(data: CreatePedidoDto): Promise<Pedido> {
        const pedido = this.pedidosRepository.create({
            status: data.status,
            itens: data.itens.map(item => this.itensRepository.create(item)),
        });
        const savedPedido = await this.pedidosRepository.save(pedido);

        // Enviar evento Kafka de criação (ver passo 3)
        await this.kafkaService.emitirEvento('pedido.criado', savedPedido);

        // Indexar no Elasticsearch (ver passo 4)
        await this.searchService.indexarPedido(savedPedido);

        return savedPedido;
    }

    async findAll(): Promise<Pedido[]> {
        return this.pedidosRepository.find();
    }

    async findOne(id_pedido: number): Promise<Pedido | null> {
        return this.pedidosRepository.findOne({ where: { id_pedido } });
    }

    async update(id: number, data: UpdatePedidoDto): Promise<Pedido> {
        const pedido = await this.findOne(id);
        if (!pedido) throw new NotFoundException(`Pedido com ID ${id} não encontrado`);

        if (data.status) pedido.status = data.status;

        if (data.itens) {
            // Remover itens antigos e criar novos
            pedido.itens = data.itens.map(item => this.itensRepository.create(item));
        }

        const updatedPedido = await this.pedidosRepository.save(pedido);

        // Enviar evento Kafka de criação (ver passo 3)
        await this.kafkaService.emitirEvento('pedido.criado', updatedPedido);

        // Indexar no Elasticsearch (ver passo 4)
        await this.searchService.indexarPedido(updatedPedido);

        return updatedPedido;
    }

    async remove(id: number): Promise<void> {
        await this.pedidosRepository.delete(id);
    }
}
