import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PedidosController (e2e)', () => {
  let app: INestApplication;
  console.log('>>> Arquivo de teste foi carregado <<<');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    console.log('>>> Arquivo de teste foi carregado <<<');

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/pedidos (POST) deve criar um novo pedido com itens', async () => {
    const pedidoDto = {
      status: 'pendente',
      itens: [
        {
          nome: 'Produto A',
          quantidade: 2,
          preco: 19.99,
        },
        {
          nome: 'Produto B',
          quantidade: 1,
          preco: 29.99,
        },
      ],
    };
    console.log('Arquivo de teste pedidos.e2e-spec.ts foi carregado');

    const response = await request(app.getHttpServer())

      .post('/pedidos')
      .send(pedidoDto)
      .expect(201);

    expect(response.body).toHaveProperty('id_pedido');
    expect(response.body.status).toBe('pendente');
    expect(Array.isArray(response.body.itens)).toBe(true);
    expect(response.body.itens.length).toBe(2);
    expect(response.body.itens[0]).toHaveProperty('nome', 'Produto A');
  });
});
