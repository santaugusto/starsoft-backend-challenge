import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido-dto';


@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() data: CreatePedidoDto) {
    return this.pedidosService.create(data);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data:UpdatePedidoDto) {
    return this.pedidosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
