import { Injectable } from '@nestjs/common';
import { Pedido } from '../pedido.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class PedidosSearchService {
    constructor(private readonly elasticClient: ElasticsearchService) {}

    async indexarPedido(pedido: Pedido) {
        await this.elasticClient.index({
            index: 'pedidos',
            id: pedido.id_pedido.toString(),
            document: {
                id_pedido: pedido.id_pedido,
                status: pedido.status,
                criadoEm: pedido.criadoEm,
                atualizadoEm: pedido.atualizadoEm,
                itens: pedido.itens?.map(item => ({
                    id_item: item.id_item,
                    nome: item.nome,
                    quantidade: item.quantidade,
                    preco: item.preco,
                })),
            },
        });
    }
}
