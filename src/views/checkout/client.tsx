'use client';

import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import styles from './styles.module.scss';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { PickUpPointsProvider } from './providers/pick-up-points';
import { DeliveryMethodsProvider } from './providers/delivery-methods';
import { PaymentMethodsProvider } from './providers/payment-methods';
import { CheckoutProvider } from './providers/checkout';
import { useCheckoutReady } from './providers/checkout/hooks/use-checkout-ready';

import { useCartItems } from '@/hooks/cart/use-cart-items';
import { useCartModal } from '@/hooks/cart/use-cart-modal';
import { useRoutePath } from '@/hooks/routing/use-route-path';

import OrderSummary from '@/components/order/OrderSummary';
import CartPlaceholder from '@/components/cart/CartPlaceholder';
import Button from '@/components/buttons/Button';
import SkeletonRows from '@/components/other/SkeletonRows';
import Breadcrumbs from '@/components/other/Breadcrumbs';
import CheckoutDelivery from './components/CheckoutDelivery';
import CheckoutPayment from './components/CheckoutPayment';
import CheckoutSubmit from './components/CheckoutSubmit';
import CheckoutSkeleton from './components/CheckoutSkeleton';

import type { IBreadcrumb } from '@/types/other/breadcrumbs';

import { ROUTES } from '@/router/routes';

const CheckoutPageClient: ComponentType = () => {
  const t = useTranslations();

  const cartItems = useCartItems();
  const isReady = useCheckoutReady();
  const cartOrder = useCartStore(s => s.order);
  const openCartModal = useCartModal();
  const routePath = useRoutePath();

  const isEmpty = isReady && cartItems.length === 0;

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
      label: t('common_breadcrumbs.checkout'),
      path: routePath(ROUTES.CHECKOUT),
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className={styles.title}>{t('view_checkout.title')}</h1>
        {isReady ? cartOrder ? (
          <div className={styles.row}>
            <div className={styles.col}>
              <Button
                type="button"
                className={clsx(styles.viewCart, styles._mobile)}
                onClick={openCartModal}
              >
                {t('view_checkout.open_cart')}
              </Button>
              <CheckoutDelivery />
              <CheckoutPayment />
            </div>
            <div className={clsx(styles.col, styles._sm)}>
              <Button
                type="button"
                className={clsx(styles.viewCart, styles._desktop)}
                onClick={openCartModal}
              >
                {t('view_checkout.open_cart')}
              </Button>
              <OrderSummary order={cartOrder} className={styles.orderSummary} />
              <div className={styles.subcontainer}>
                <CheckoutSubmit />
              </div>
            </div>
          </div>
        ) : null : (
          <div className={styles.row}>
            <div className={styles.col}>
              <CheckoutSkeleton />
              <CheckoutSkeleton />
              <CheckoutSkeleton />
            </div>
            <div className={clsx(styles.col, styles._sm)}>
              <div className={styles.subcontainer}>
                <SkeletonRows />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

const CheckoutPageWrapper: ComponentType = () => {
  return (
    <PickUpPointsProvider>
      <DeliveryMethodsProvider>
        <PaymentMethodsProvider>
          <CheckoutProvider>
            <CheckoutPageClient />
          </CheckoutProvider>
        </PaymentMethodsProvider>
      </DeliveryMethodsProvider>
    </PickUpPointsProvider>
  )
}

export default CheckoutPageWrapper;
