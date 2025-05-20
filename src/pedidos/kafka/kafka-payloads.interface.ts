import { ItemDto } from 'src/itens/dto/item.dto';

export interface OrderCreatedPayload {
  id_pedido: number;
  status: string;
  itens: ItemDto[];
  createdAt: string;
}

export interface OrderStatusUpdatedPayload {
  id_pedido: number;
  status: string;
  updatedAt: string;
}

export type KafkaPayload = (OrderCreatedPayload | OrderStatusUpdatedPayload) & {
  message?: string;
};
