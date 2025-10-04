import { ComponentType, useEffect, useState } from 'react';

import type { IOrderItem } from '@/types/models/order-item';
import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

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
    <input type="number" value={value} onChange={e => setValue(+e.target.value)} />
  )
}

export default CartItemCounter;
