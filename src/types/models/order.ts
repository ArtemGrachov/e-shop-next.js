import type { IOrderItem } from '@/types/models/order-item'
import type { IOrderPrice } from '@/types/models/order-price'

export interface IOrder {
  id: string;
  code: string;
  items: IOrderItem[];
  price: IOrderPrice;
}
