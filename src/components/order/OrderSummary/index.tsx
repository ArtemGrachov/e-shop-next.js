import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { useShopCtx } from '@/providers/shop/hooks/use-shop-ctx';

import type { IOrder } from '@/types/models/order';

interface IProps {
  order: IOrder;
}

const OrderSummary: ComponentType<IProps> = ({ order }) => {
  const { CURRENCY } = useShopCtx();
  const t = useTranslations();
  const itemsPrice = order.price.itemsPrice;
  const deliveryPrice = order.price.deliveryPrice;
  const totalPrice = order.price.totalPrice;

  return (
    <table>
      <tbody>
        <tr>
          <td>
            {t('common_order.items_price')}
          </td>
          <td>
            {itemsPrice} {CURRENCY}
          </td>
        </tr>
        <tr>
          <td>
            {t('common_order.delivery_price')}
          </td>
          <td>
            {deliveryPrice} {CURRENCY}
          </td>
        </tr>
        <tr>
          <td>
            <strong>
              {t('common_order.total')}
            </strong>
          </td>
          <td>
            <strong>
              {totalPrice} {CURRENCY}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default OrderSummary;
