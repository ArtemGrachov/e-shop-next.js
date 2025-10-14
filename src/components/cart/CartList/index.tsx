import { ComponentType } from 'react';

import CartItem from '@/components/cart/CartItem';
import CartItemSkeleton from '@/components/cart/CartItemSkeleton';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItems?: IOrderItem[];
  onNavigate?: Function;
  isProcessing?: boolean;
}

const CartList: ComponentType<IProps> = ({ orderItems, isProcessing, onNavigate }) => {
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
      {isProcessing ? (
        <>
          <li className={styles.item}>
            <CartItemSkeleton />
          </li>
          <li className={styles.item}>
            <CartItemSkeleton />
          </li>
        </>
      ) : null}
    </ul>
  )
}

export default CartList;
