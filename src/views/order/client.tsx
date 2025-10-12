'use client';

import { ComponentType, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { EStatus } from '@/constants/status';

import { OrderProvider } from './providers/order';
import { useOrderCtx } from './providers/order/hooks/use-order-ctx';
import { useOrderStore } from './providers/order/hooks/use-order-store';

import DeliveryMethod from '@/components/delivery/DeliveryMethod';
import DeliveryAddress from '@/components/delivery/DeliveryAddress';
import PaymentMethod from '@/components/payment/PaymentMethod';
import OrderItemList from '@/components/order/OrderItemList';
import OrderSummary from '@/components/order/OrderSummary';
import PickUpPoint from '@/components/delivery/PickUpPoint';
import SkeletonRows from '@/components/other/SkeletonRows';

import styles from './styles.module.scss';

const OrderPageClient: ComponentType = () => {
  const t = useTranslations();
  const { getOrder } = useOrderCtx();
  const params = useParams();
  const orderId = params.orderId;

  useEffect(() => {
    getOrder(orderId as string);
  }, []);

  const getStatus = useOrderStore(s => s.getStatus);
  const isProcessing = getStatus === EStatus.PROCESSING || getStatus === EStatus.INIT;
  const isSuccess = getStatus === EStatus.SUCCESS;
  const order = useOrderStore(s => s.order);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {t('order_page.title')}
        </h1>
        {isProcessing ? (
          <>
            <div className={styles.section}>
              <SkeletonRows />
            </div>
            <div className={styles.section}>
              <SkeletonRows />
            </div>
            <div className={styles.section}>
              <SkeletonRows />
            </div>
          </>
        ) : (isSuccess && order) ? (
          <>
            <div className={styles.section}>
              <OrderItemList orderItems={order.items} />
            </div>
            <div className={styles.section}>
              <DeliveryMethod deliveryMethod={order.deliveryMethod!} />
              {order.pickUpPoint && <PickUpPoint pickUpPoint={order.pickUpPoint} />}
              <DeliveryAddress deliveryMethod={order.deliveryMethod!} deliveryAddress={order.deliveryAddress!} />
            </div>
            <div className={styles.section}>
              <PaymentMethod paymentMethod={order.paymentMethod!} />
            </div>
            <div className={styles.section}>
              <OrderSummary order={order} />
            </div>
          </>
        ) : null}
      </div>
    </main>
  )
}

const OrderPageWrapper: ComponentType = () => {
  return (
    <OrderProvider>
      <OrderPageClient />
    </OrderProvider>
  )
}

export default OrderPageWrapper;
