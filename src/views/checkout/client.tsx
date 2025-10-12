'use client';

import { ComponentType, lazy } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';
import { PickUpPointsProvider } from './providers/pick-up-points';
import { DeliveryMethodsProvider } from './providers/delivery-methods';
import { PaymentMethodsProvider } from './providers/payment-methods';
import { CheckoutProvider } from './providers/checkout';
import { useCheckoutReady } from './providers/checkout/hooks/use-checkout-ready';

import { useCartItems } from '@/hooks/cart/cart-items';

import OrderSummary from '@/components/order/OrderSummary';
import CartPlaceholder from '@/components/cart/CartPlaceholder';
import Button from '@/components/buttons/Button';
import SkeletonRows from '@/components/other/SkeletonRows';
import CheckoutDelivery from './components/CheckoutDelivery';
import CheckoutPayment from './components/CheckoutPayment';
import CheckoutSubmit from './components/CheckoutSubmit';
import CheckoutSkeleton from './components/CheckoutSkeleton';

import styles from './styles.module.scss';

const ModalCart = lazy(() => import('@/components/modal/ModalCart'));

const CheckoutPageClient: ComponentType = () => {
  const t = useTranslations();

  const { openModal } = useModalsCtx();
  const cartItems = useCartItems();
  const isReady = useCheckoutReady();
  const cartOrder = useCartStore(s => s.order)

  const isEmpty = isReady && cartItems.length === 0;

  if (isEmpty) {
    return (
      <main className={styles.page}>
        <CartPlaceholder />
      </main>
    )
  }

  const openCartHandler = () => {
    openModal({ id: 'MODAL_CART', component: ModalCart, props: { checkout: true } });
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>{t('view_checkout.title')}</h1>
        {isReady ? cartOrder ? (
          <div className={styles.row}>
            <div className={styles.col}>
              <Button
                type="button"
                className={clsx(styles.viewCart, styles._mobile)}
                onClick={openCartHandler}
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
                onClick={openCartHandler}
              >
                {t('view_checkout.open_cart')}
              </Button>
              <OrderSummary order={cartOrder} className={styles.orderSummary} />
              <CheckoutSubmit />
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
              <SkeletonRows />
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
