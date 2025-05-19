import { Inject, Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka, Admin } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PedidosKafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PedidosKafkaService.name);
  private admin: Admin;

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();

    const kafka = new Kafka({
      clientId: 'pedidos-service-admin',
      brokers: [this.configService.get<string>('KAFKA_BROKER', 'kafka:9092')],
    });

    this.admin = kafka.admin();
    await this.admin.connect();

   
    await this.criarTopicoSeNaoExistir('pedidos', 3);
  }

  async onModuleDestroy() {
    if (this.admin) {
      await this.admin.disconnect();
      this.logger.log('Admin Kafka desconectado.');
    }
  }

  private async criarTopicoSeNaoExistir(nomeTopico: string, partitions: number) {
    try {
      const topicos = await this.admin.listTopics();

      if (!topicos.includes(nomeTopico)) {
        await this.admin.createTopics({
          topics: [{ topic: nomeTopico, numPartitions: partitions }],
        });
        this.logger.log(`Tópico '${nomeTopico}' criado com ${partitions} partições.`);
      } else {
        this.logger.log(`Tópico '${nomeTopico}' já existe.`);
      }
    } catch (err) {
      this.logger.error(`Erro ao criar o tópico '${nomeTopico}': ${err.message}`);
    }
  }

async emitirEvento(topic: string, payload: unknown, tentativas = 5, delayMs = 1000): Promise<void> {
  for (let i = 0; i < tentativas; i++) {
    try {
      this.logger.log(`Tentando emitir evento (tentativa ${i + 1}) para o tópico '${topic}'`);
      await this.kafkaClient.emit(topic, payload).toPromise();
      this.logger.log(`Evento emitido com sucesso para o tópico '${topic}'`);
      return; 
    } catch (error: unknown) {
      let message = 'Erro desconhecido';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`Erro ao emitir evento para '${topic}': ${message}`);
      if (i < tentativas - 1) {
        await new Promise<void>(resolve => setTimeout(resolve, delayMs)); 
      } else {
        this.logger.error(`Falha definitiva ao emitir evento para '${topic}' após ${tentativas} tentativas.`);
      }
    }
  }
}

}
