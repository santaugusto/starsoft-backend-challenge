import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Registry, Counter } from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly registry: Registry;
  private readonly httpRequestCounter: Counter<string>;

  constructor() {

    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });

    this.httpRequestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });
  }

  incrementHttpRequestCount(method: string, route: string, status: string) {
    this.httpRequestCounter.labels(method, route, status).inc();
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
