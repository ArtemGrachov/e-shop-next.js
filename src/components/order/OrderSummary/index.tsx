import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useShopCtx } from '@/providers/shop/hooks/use-shop-ctx';

import type { IOrder } from '@/types/models/order';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  order: IOrder;
}

const OrderSummary: ComponentType<IProps & IPropsWithClassName> = ({ order, className }) => {
  const { CURRENCY } = useShopCtx();
  const t = useTranslations();
  const itemsPrice = order.price.itemsPrice;
  const deliveryPrice = order.price.deliveryPrice;
  const totalPrice = order.price.totalPrice;

  return (
    <table className={clsx(styles.orderSummary, className)}>
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
