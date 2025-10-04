import { ComponentType } from 'react';

import CartItem from '@/components/cart/CartItem';

import type { IOrderItem } from '@/types/models/order-item';

interface IProps {
  orderItems?: IOrderItem[];
}

const CartList: ComponentType<IProps> = ({ orderItems }) => {
  orderItems = orderItems ?? [];

  return (
    <ul>
      {orderItems.map(orderItem => {
        return (
          <li key={orderItem.id}>
            <CartItem orderItem={orderItem} />
          </li>
        )
      })}
    </ul>
  )
}

export default CartList;
