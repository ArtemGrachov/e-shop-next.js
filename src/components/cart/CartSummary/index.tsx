import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import type { IOrder } from '@/types/models/order';

interface IProps {
  order: IOrder;
}

const CartSummary: ComponentType<IProps> = ({ order }) => {
  const t = useTranslations();
  const totalPrice = order.price.totalPrice;

  return (
    <div>
      <p>
        {t('common_order.total')}: {totalPrice}
      </p>
    </div>
  )
}

export default CartSummary;
