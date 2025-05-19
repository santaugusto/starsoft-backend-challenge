import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ItemPedido } from 'src/itens/item.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn('increment')
  id_pedido: number;

  @Column({
    type: 'enum',
    enum: ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'],
    default: 'pendente',
  })
  status: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @OneToMany(() => ItemPedido, (item) => item.pedido, {
    cascade: true,
    eager: true,
  })
  itens: ItemPedido[];
}
