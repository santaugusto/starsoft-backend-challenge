import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { ItemDto } from "src/itens/dto/item.dto";

export class UpdatePedidoDto {
  @ApiProperty({ enum: ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'], required: false })
  @IsEnum(['pendente', 'processando', 'enviado', 'entregue', 'cancelado'])
  @IsOptional()
  status?: string;

  @ApiProperty({ type: [ItemDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @IsOptional()
  itens?: ItemDto[];
}