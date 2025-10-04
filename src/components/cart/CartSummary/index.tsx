import { ComponentType, useMemo } from 'react';

import type { IOrderItem } from '@/types/models/order-item';
import { useTranslations } from 'next-intl';

interface IProps {
  orderItems?: IOrderItem[];
}

const CartSummary: ComponentType<IProps> = ({ orderItems }) => {
  const t = useTranslations();

  orderItems = orderItems ?? [];

  const totalPrice = useMemo(() => {
    return orderItems.reduce((acc, curr) => acc + curr.price.value, 0);
  }, [orderItems]);

  const currency = useMemo(() => {
    return orderItems[0]?.price.currency;
  }, [orderItems]);

  return (
    <div>
      <p>
        {t('common_order.total')}: {totalPrice} {currency}
      </p>
    </div>
  )
}

export default CartSummary;
