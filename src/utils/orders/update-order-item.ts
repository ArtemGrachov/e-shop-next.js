import { IOrderItem } from '@/types/models/order-item';

export const updateOrderItem = (orderItem: IOrderItem) => {
  orderItem.price.total = orderItem.price.value * orderItem.quantity;
  return orderItem;
}
