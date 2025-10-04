import type { IOrder } from '@/types/models/order';
import type { IOrderPrice } from '@/types/models/order-price';

import { calculateItemsPrice } from '@/utils/orders/calculate-items-price';

export const calculateOrderPrice = (order: IOrder): IOrderPrice => {
  const itemsPrice = calculateItemsPrice(order.items);
  const deliveryPrice = 0;

  return {
    itemsPrice: calculateItemsPrice(order.items),
    deliveryPrice,
    totalPrice: itemsPrice + deliveryPrice,
  };
}
