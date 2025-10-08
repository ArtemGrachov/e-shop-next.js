import { ComponentType } from 'react';

import OrderItem from '@/components/order/OrderItem';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItems?: IOrderItem[];
}

const OrderItemList: ComponentType<IProps> = ({ orderItems }) => {
  orderItems = orderItems ?? [];

  return (
    <ul className={styles.list}>
      {orderItems.map(orderItem => {
        return (
          <li key={orderItem.id} className={styles.item}>
            <OrderItem orderItem={orderItem} />
          </li>
        )
      })}
    </ul>
  )
}

export default OrderItemList;
