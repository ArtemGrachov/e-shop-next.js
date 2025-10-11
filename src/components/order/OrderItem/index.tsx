import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { pathcat } from 'pathcat';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import Price from '@/components/other/Price';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItem: IOrderItem;
}

const OrderItem: ComponentType<IProps> = ({ orderItem }) => {
  const locale = useLocale();

  const href = useMemo(() => {
    let slugId = `${orderItem.slug[locale]}-${orderItem.productId}`;

    if (orderItem.productVariantId) {
      slugId += `/${orderItem.variantSlug![locale]}-${orderItem.productVariantId}`;
    }

    return pathcat('/', ROUTES.PRODUCT, { slugId });
  }, [orderItem]);

  return (
    <div className={styles.orderItem}>
      <Link href={href} className={styles.description}>
        <div className={styles.image}></div>
        <div className={styles.name}>
          {orderItem.name[locale]}
        </div>
      </Link>
      <div className={styles.quantity}>
        x{orderItem.quantity}
      </div>
      <Price price={orderItem.price} />
    </div>
  )
}

export default OrderItem;
