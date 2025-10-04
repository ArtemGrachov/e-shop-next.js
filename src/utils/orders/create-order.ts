import type { IOrder } from '@/types/models/order';
import type { IOrderItem } from '@/types/models/order-item';

import { calculateOrderPrice } from '@/utils/orders/calculate-order-price';

export const createOrder = (orderItems: IOrderItem[]): IOrder => {
  const order: Partial<IOrder> = {
    id: crypto.randomUUID(),
    code: crypto.randomUUID(),
    items: orderItems,
  };

  const price = calculateOrderPrice(order as IOrder);

  order.price = price;

  return order as IOrder;
}
