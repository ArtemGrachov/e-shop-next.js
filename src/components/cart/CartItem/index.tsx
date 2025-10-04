import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import Price from '@/components/other/Price';

import type { IOrderItem } from '@/types/models/order-item';
import CartItemCounter from '@/components/cart/CartItemCounter';

interface IProps {
  orderItem: IOrderItem;
}

const CartItem: ComponentType<IProps> = ({ orderItem }) => {
  const locale = useLocale();

  return (
    <div>
      <p>
        {orderItem.name[locale]}
      </p>
      <p>
        x{orderItem.quantity}
      </p>
      <Price price={orderItem.price} />
      <CartItemCounter orderItem={orderItem} />
    </div>
  )
}

export default CartItem;
