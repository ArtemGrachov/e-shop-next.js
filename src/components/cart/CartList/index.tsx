import { ComponentType } from 'react';

import CartItem from '@/components/cart/CartItem';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItems?: IOrderItem[];
}

const CartList: ComponentType<IProps> = ({ orderItems }) => {
  orderItems = orderItems ?? [];

  return (
    <ul className={styles.list}>
      {orderItems.map(orderItem => {
        return (
          <li key={orderItem.id} className={styles.item}>
            <CartItem orderItem={orderItem} />
          </li>
        )
      })}
    </ul>
  )
}

export default CartList;
