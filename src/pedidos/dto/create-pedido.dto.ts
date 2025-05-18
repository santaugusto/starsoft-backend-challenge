import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDto } from 'src/itens/dto/item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  
  @ApiProperty({ enum: ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'] })
  @IsEnum(['pendente', 'processando', 'enviado', 'entregue', 'cancelado'])
  status: string;

  @ApiProperty({ type: [ItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  itens: ItemDto[];
}