import { ComponentType } from 'react';

import CartItem from '@/components/cart/CartItem';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItems?: IOrderItem[];
  onNavigate?: Function;
}

const CartList: ComponentType<IProps> = ({ orderItems, onNavigate }) => {
  orderItems = orderItems ?? [];

  return (
    <ul className={styles.list}>
      {orderItems.map(orderItem => {
        return (
          <li key={orderItem.id} className={styles.item}>
            <CartItem orderItem={orderItem} onNavigate={onNavigate} />
          </li>
        )
      })}
    </ul>
  )
}

export default CartList;
