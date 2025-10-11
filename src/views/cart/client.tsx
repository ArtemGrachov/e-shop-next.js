'use client';

import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { ROUTES } from '@/router/routes';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

import { useCartItems } from '@/hooks/cart/cart-items';
import { useRoutePath } from '@/hooks/routing/use-route-path';

import CartList from '@/components/cart/CartList';
import OrderSummary from '@/components/order/OrderSummary';
import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';

const CartPageClient: ComponentType = () => {
  const t = useTranslations();
  const routePath = useRoutePath();

  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>{t('view_cart.title')}</h1>
        <div className={styles.row}>
          <div className={styles.col}>
            <CartList orderItems={cartItems} />
          </div>
          <div className={clsx(styles.col, styles._sm)}>
            {order && <OrderSummary order={order} className={styles.orderSummary} />}
            <Button href={routePath(ROUTES.CHECKOUT)} tag={'Link'} variant={'primary'}>
              {t('view_cart.checkout')}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CartPageClient;
