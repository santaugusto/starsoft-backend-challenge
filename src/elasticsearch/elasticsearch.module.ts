import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const node = config.get<string>('ELASTICSEARCH_NODE');
        if (!node) {
          throw new Error('ELASTICSEARCH_NODE is not defined');
        }
        return {
          node: config.get<string>('ELASTICSEARCH_NODE'),
        };
      },
    }),
  ],
  exports: [ElasticsearchModule],
})
export class MyElasticsearchModule { }
