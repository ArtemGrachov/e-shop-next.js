'use client';

import { ComponentType, lazy } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { PickUpPointsProvider } from '@/views/checkout/providers/pick-up-points';
import { DeliveryMethodsProvider } from '@/views/checkout/providers/delivery-methods';
import { PaymentMethodsProvider } from '@/views/checkout/providers/payment-methods';
import { CheckoutProvider } from '@/views/checkout/providers/checkout';
import { useCheckoutReady } from '@/views/checkout/providers/checkout/hooks/use-checkout-ready';
import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import { useCartItems } from '@/hooks/cart/cart-items';

import CheckoutDelivery from '@/components/checkout/CheckoutDelivery';
import CheckoutPayment from '@/components/checkout/CheckoutPayment';
import CheckoutSubmit from '@/components/checkout/CheckoutSubmit';
import OrderSummary from '@/components/order/OrderSummary';
import CartPlaceholder from '@/components/cart/CartPlaceholder';
import Button from '@/components/buttons/Button';
import CheckoutSkeleton from '@/components/checkout/CheckoutSkeleton';
import SkeletonRows from '@/components/other/SkeletonRows';

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
