import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [config.get<string>('KAFKA_BROKER', 'kafka:9092')],
            },
            consumer: {
              groupId: config.get<string>('KAFKA_GROUP_ID', 'pedido-consumer'),
            },
             retryAttempts: 10,
            retryDelay: 5000, 
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule], 
})
export class KafkaModule {}
