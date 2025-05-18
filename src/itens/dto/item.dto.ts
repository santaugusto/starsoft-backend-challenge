import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    quantidade: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    preco: number;
}
