import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PedidosModule } from './pedidos/pedidos.module';
import { ItensModule } from './itens/itens.module';
import { KafkaModule } from './kafka/kafka.module';
import { MyElasticsearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    // Carregar variáveis de ambiente globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexão com PostgreSQL via TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: Number(config.get<number>('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true, // desative em produção
      }),
    }),

    MyElasticsearchModule,
    KafkaModule,
    PedidosModule,
    ItensModule,
  ],
})
export class AppModule { }
