import { ComponentType, useEffect, useState } from 'react';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItem: IOrderItem;
}

export const CartItemCounter: ComponentType<IProps> = ({ orderItem }) => {
  const { updateQuantity } = useCartCtx();
  const [value, setValue] = useState(orderItem.quantity);

  useEffect(() => {
    setValue(orderItem.quantity);
  }, [orderItem.quantity]);

  useEffect(() => {
    updateQuantity(orderItem.id, value);
  }, [value]);

  return (
    <input
      type="number"
      className={styles.input}
      value={value}
      min={1}
      onChange={e => setValue(+e.target.value)}
    />
  )
}

export default CartItemCounter;
