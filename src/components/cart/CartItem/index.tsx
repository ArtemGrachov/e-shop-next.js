import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import Price from '@/components/other/Price';
import CartItemCounter from '@/components/cart/CartItemCounter';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import type { IOrderItem } from '@/types/models/order-item';

interface IProps {
  orderItem: IOrderItem;
}

const CartItem: ComponentType<IProps> = ({ orderItem }) => {
  const locale = useLocale();
  const { removeItem } = useCartCtx();

  const removeHandler = () => {
    removeItem(orderItem.id);
  }

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
      <button type="button" onClick={removeHandler}>
        x
      </button>
    </div>
  )
}

export default CartItem;
