import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const logDir = 'logs';

    // Garante que o diretório de logs exista
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const esTransportOpts = {
      level: 'silly',
      clientOpts: {
        node: 'http://elasticsearch:9200',
      },
      indexPrefix: 'nestjs-logs',
    };

    const esTransport = new ElasticsearchTransport(esTransportOpts);

    this.logger = winston.createLogger({
      levels: winston.config.npm.levels,
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return JSON.stringify({
            timestamp,
            level,
            message: this.formatMessage(message),
            ...meta,
          });
        }),
      ),
      transports: [
        new winston.transports.Console(),

        new winston.transports.File({
          filename: path.join(logDir, 'error.log'),
          level: 'error',
        }),

        new winston.transports.File({
          filename: path.join(logDir, 'combined.log'),
        }),

        esTransport,
      ],
    });
  }

  private formatMessage(message: any): string {
    if (message instanceof Error) {
      return `${message.message} \n${message.stack}`;
    }

    if (typeof message === 'object') {
      try {
        const str = JSON.stringify(message);
        return str === '{}' ? 'Objeto de erro vazio ou sem mensagem.' : str;
      } catch {
        return 'Não foi possível serializar a mensagem do erro.';
      }
    }

    if (message === undefined || message === null || message === '') {
      return 'Mensagem de log indefinida ou vazia.';
    }

    return String(message);
  }

  log(message: any) {
    this.logger.info(this.formatMessage(message));
  }

  error(message: any, trace?: string) {
    const formattedMessage = this.formatMessage(message);
    const stack = message?.stack || trace;
    this.logger.error(formattedMessage, { trace: stack });
  }

  warn(message: any) {
    this.logger.warn(this.formatMessage(message));
  }

  debug(message: any) {
    this.logger.debug(this.formatMessage(message));
  }

  verbose(message: any) {
    this.logger.verbose(this.formatMessage(message));
  }

  silly(message: any) {
    this.logger.silly(this.formatMessage(message));
  }

  http(message: any) {
    this.logger.http(this.formatMessage(message));
  }
}
