import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from 'src/pedidos/pedido.entity'; 

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn('increment')
  id_item: number;

  @Column()
  nome: string;

  @Column('int')
  quantidade: number;

  @Column('decimal')
  preco: number;

  @ManyToOne(() => Pedido, pedido => pedido.itens, {
    onDelete: 'CASCADE',
  })
  pedido: Pedido;
}
