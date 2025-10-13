'use client';

import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { ROUTES } from '@/router/routes';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

import { useCartItems } from '@/hooks/cart/use-cart-items';
import { useRoutePath } from '@/hooks/routing/use-route-path';

import CartList from '@/components/cart/CartList';
import OrderSummary from '@/components/order/OrderSummary';
import Button from '@/components/buttons/Button';
import CartPlaceholder from '@/components/cart/CartPlaceholder';
import Breadcrumbs from '@/components/other/Breadcrumbs';

import type { IBreadcrumb } from '@/types/other/breadcrumbs';

import styles from './styles.module.scss';

const CartPageClient: ComponentType = () => {
  const t = useTranslations();
  const routePath = useRoutePath();

  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();

  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <main className={styles.page}>
        <CartPlaceholder />
      </main>
    )
  }

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('common_breadcrumbs.home'),
      path: routePath(ROUTES.HOME),
    },
    {
      label: t('common_breadcrumbs.cart'),
      path: routePath(ROUTES.CART),
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className={styles.title}>{t('view_cart.title')}</h1>
        <div className={styles.row}>
          <div className={styles.col}>
            <CartList orderItems={cartItems} />
          </div>
          <div className={clsx(styles.col, styles._sm)}>
            {order && <OrderSummary order={order} className={styles.orderSummary} />}
            <Button href={routePath(ROUTES.FAVOURITES)} tag={'Link'} variant={'primary'}>
              {t('view_cart.checkout')}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CartPageClient;
