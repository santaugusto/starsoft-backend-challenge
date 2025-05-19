import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido-dto';
import { Docs } from './docs/pedidos.docs';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation(Docs.create)
  create(@Body() data: CreatePedidoDto) {
    return this.pedidosService.create(data);
  }

  @Get()
  @ApiOperation(Docs.findAll)
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @ApiOperation(Docs.findOne)
  @ApiParam({ name: 'id', type: Number, description: 'ID do pedido' })
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation(Docs.update)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser atualizado',
  })
  update(@Param('id') id: string, @Body() data: UpdatePedidoDto) {
    return this.pedidosService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation(Docs.remove)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do pedido a ser removido',
  })
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
