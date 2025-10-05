import { ComponentType } from 'react';

import OrderItem from '@/components/order/OrderItem';

import type { IOrderItem } from '@/types/models/order-item';

interface IProps {
  orderItems?: IOrderItem[];
}

const OrderItemList: ComponentType<IProps> = ({ orderItems }) => {
  orderItems = orderItems ?? [];

  return (
    <ul>
      {orderItems.map(orderItem => {
        return (
          <li key={orderItem.id}>
            <OrderItem orderItem={orderItem} />
          </li>
        )
      })}
    </ul>
  )
}

export default OrderItemList;
