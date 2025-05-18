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

    // Criar o tópico se ele ainda não existir
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

  async emitirEvento(topic: string, payload: any) {
    this.logger.log(`Emitindo evento para o tópico '${topic}' com payload: ${JSON.stringify(payload)}`);
    await this.kafkaClient.emit(topic, payload).toPromise();
  }
}
