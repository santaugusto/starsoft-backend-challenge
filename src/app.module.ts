import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PedidosModule } from './pedidos/pedidos.module';
import { ItensModule } from './itens/itens.module';
import { KafkaModule } from './kafka/kafka.module';
import { MyElasticsearchModule } from './elasticsearch/elasticsearch.module';

import { WinstonLoggerService } from './common/logger/winston-logger.service';
import { PrometheusModule } from './common/prometheus/prometheus.module';
import { PrometheusInterceptor } from './common/interceptors/prometheus.interceptor';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
        synchronize: true,
      }),
    }),
    PrometheusModule,
    MyElasticsearchModule,
    KafkaModule,
    PedidosModule,
    ItensModule,
    LoggerModule,
  ],
  providers: [
    WinstonLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PrometheusInterceptor,
    },],
  exports: [WinstonLoggerService],
})
export class AppModule { }
