import type { IOrderItem } from '@/types/models/order-item';

export const calculateItemsPrice = (orderItems: IOrderItem[]) => {
  return orderItems.reduce((acc, curr) => {
    return acc + curr.price.total;
  }, 0);
}
