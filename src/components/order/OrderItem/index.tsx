import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import Price from '@/components/other/Price';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItem: IOrderItem;
}

const OrderItem: ComponentType<IProps> = ({ orderItem }) => {
  const locale = useLocale();
  const routePath = useRoutePath();

  const href = useMemo(() => {
    let slugId = `${orderItem.slug[locale]}-${orderItem.productId}`;

    if (orderItem.productVariantId) {
      slugId += `/${orderItem.variantSlug![locale]}-${orderItem.productVariantId}`;
    }

    return routePath(ROUTES.PRODUCT, { slugId });
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
