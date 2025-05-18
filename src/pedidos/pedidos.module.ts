import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { ItemPedido } from '../itens/item.entity';
import { PedidosKafkaService } from './kafka/pedidos.kafka';
import { MyElasticsearchModule } from 'src/elasticsearch/elasticsearch.module';
import { PedidosSearchService } from './search/pedidos.search';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, ItemPedido]), MyElasticsearchModule,KafkaModule],
  controllers: [PedidosController],
  providers: [PedidosService, PedidosKafkaService, PedidosSearchService],
  exports:[PedidosKafkaService]
})
export class PedidosModule {}
