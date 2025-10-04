import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { useShopCtx } from '@/providers/shop/hooks/use-shop-ctx';

import type { IOrder } from '@/types/models/order';

interface IProps {
  order: IOrder;
}

const CartSummary: ComponentType<IProps> = ({ order }) => {
  const { CURRENCY } = useShopCtx();
  const t = useTranslations();
  const totalPrice = order.price.totalPrice;

  return (
    <div>
      <p>
        {t('common_order.total')}: {totalPrice} {CURRENCY}
      </p>
    </div>
  )
}

export default CartSummary;
