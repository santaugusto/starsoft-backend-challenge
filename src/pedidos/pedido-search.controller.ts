import { Controller, Get, Query } from '@nestjs/common';
import { PedidosSearchService } from './pedidos.search.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Docs } from './docs/pedidos.docs';

@ApiTags('Pedidos Elasticsearch ')
@Controller('pedidos/search')
export class PedidoSearchController {
  constructor(private readonly searchService: PedidosSearchService) {}

  @Get('por-id')
  @ApiOperation(Docs.buscarPorId)
  @ApiQuery({
    name: 'id',
    type: Number,
    required: true,
    description: 'ID do pedido',
  })
  buscarPorId(@Query('id') id: string) {
    return this.searchService.buscarPorId(Number(id));
  }

  @Get('por-status')
  @ApiOperation(Docs.buscarPorStatus)
  @ApiQuery({
    name: 'status',
    type: String,
    required: true,
    description: 'Status do pedido',
  })
  buscarPorStatus(@Query('status') status: string) {
    return this.searchService.buscarPorStatus(status);
  }

  @Get('por-data')
  @ApiOperation(Docs.buscarPorData)
  @ApiQuery({
    name: 'inicio',
    type: String,
    required: true,
    description: 'Data de início (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'fim',
    type: String,
    required: true,
    description: 'Data de fim (YYYY-MM-DD)',
  })
  buscarPorData(@Query('inicio') inicio: string, @Query('fim') fim: string) {
    return this.searchService.buscarPorData(inicio, fim);
  }

  @Get('por-item')
  @ApiOperation(Docs.buscarPorItem)
  @ApiQuery({
    name: 'nome',
    type: String,
    required: true,
    description: 'Nome do item',
  })
  buscarPorItem(@Query('nome') nome: string) {
    return this.searchService.buscarPorItem(nome);
  }
}
