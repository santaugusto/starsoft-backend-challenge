import { ApiOperationOptions } from '@nestjs/swagger';

export const Docs = {
  create: {
    summary: 'Criar pedido',
    description: 'Cria um novo pedido com os dados fornecidos.',
  } as ApiOperationOptions,

  findAll: {
    summary: 'Listar pedidos',
    description: 'Retorna uma lista com todos os pedidos cadastrados.',
  } as ApiOperationOptions,

  findOne: {
    summary: 'Buscar pedido por ID',
    description: 'Retorna os dados de um pedido específico com base no ID.',
  } as ApiOperationOptions,

  update: {
    summary: 'Atualizar pedido',
    description: 'Atualiza os dados de um pedido existente com base no ID.',
  } as ApiOperationOptions,

  remove: {
    summary: 'Remover pedido',
    description: 'Remove um pedido com base no ID.',
  } as ApiOperationOptions,

  buscarPorId: {
    summary: 'Buscar pedido (Elasticsearch) por ID',
    description:
      'Retorna os dados de um pedido buscado por ID via Elasticsearch.',
  } as ApiOperationOptions,

  buscarPorStatus: {
    summary: 'Buscar pedidos por status',
    description: 'Busca e retorna pedidos com base no status informado.',
  } as ApiOperationOptions,

  buscarPorData: {
    summary: 'Buscar pedidos por intervalo de datas',
    description:
      'Busca pedidos criados dentro de um intervalo de datas (início/fim).',
  } as ApiOperationOptions,

  buscarPorItem: {
    summary: 'Buscar pedidos por nome de item',
    description:
      'Busca e retorna pedidos que contenham um item com nome semelhante ao informado.',
  } as ApiOperationOptions,
};
