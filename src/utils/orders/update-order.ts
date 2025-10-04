import type { IOrder } from '@/types/models/order';

import { calculateOrderPrice } from '@/utils/orders/calculate-order-price';
import { updateOrderItem } from '@/utils/orders/update-order-item';

export const updateOrder = (order: IOrder): IOrder => {
  order.items = order.items.map(updateOrderItem);
  order.price = calculateOrderPrice(order);

  return order;
}
