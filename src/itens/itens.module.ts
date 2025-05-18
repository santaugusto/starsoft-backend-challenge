import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from './item.entity';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPedido])],
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensModule {}
