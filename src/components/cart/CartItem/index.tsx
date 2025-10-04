import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import Price from '@/components/other/Price';

import type { IOrderItem } from '@/types/models/order-item';

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
    </div>
  )
}

export default CartItem;
