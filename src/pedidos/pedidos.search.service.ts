import { Injectable } from '@nestjs/common';
import { Pedido } from './pedido.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class PedidosSearchService {
  constructor(private readonly elasticClient: ElasticsearchService) {}

  async indexarPedido(pedido: Pedido) {
    await this.elasticClient.index({
      index: 'pedidos',
      id: pedido.id_pedido.toString(),
      document: {
        id_pedido: pedido.id_pedido,
        status: pedido.status,
        criadoEm: pedido.criadoEm,
        atualizadoEm: pedido.atualizadoEm,
        itens: pedido.itens?.map((item) => ({
          id_item: item.id_item,
          nome: item.nome,
          quantidade: item.quantidade,
          preco: item.preco,
        })),
      },
    });
  }
  async buscarPorId(id: number) {
    const idNum = Number(id);
    if (isNaN(idNum)) throw new Error('ID inválido');

    const { hits } = await this.elasticClient.search({
      index: 'pedidos',
      body: {
        query: {
          term: { id_pedido: idNum },
        },
      },
    });

    return hits.hits.map((hit) => hit._source);
  }

  async buscarPorStatus(status: string) {
    const { hits } = await this.elasticClient.search({
      index: 'pedidos',
      query: {
        match: { status },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }

  async buscarPorData(inicio: string, fim: string) {
    const { hits } = await this.elasticClient.search({
      index: 'pedidos',
      query: {
        range: {
          criadoEm: {
            gte: inicio,
            lte: fim,
          },
        },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }

  async buscarPorItem(nomeItem: string) {
    const { hits } = await this.elasticClient.search({
      index: 'pedidos',
      body: {
        query: {
          match: { 'itens.nome': nomeItem },
        },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }
}
