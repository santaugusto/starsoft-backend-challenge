import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async emit<T>(topic: string, message: T): Promise<void> {
    await this.kafkaClient.emit<T>(topic, message).toPromise();
  }
}
