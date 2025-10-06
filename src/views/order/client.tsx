'use client';

import { ComponentType, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { EStatus } from '@/constants/status';

import { OrderProvider } from '@/providers/order';
import { useOrderCtx } from '@/providers/order/hooks/use-order-ctx';
import { useOrderStore } from '@/providers/order/hooks/use-order-store';

import DeliveryMethod from '@/components/delivery/DeliveryMethod';
import DeliveryAddress from '@/components/delivery/DeliveryAddress';
import PaymentMethod from '@/components/payment/PaymentMethod';
import OrderItemList from '@/components/order/OrderItemList';
import OrderSummary from '@/components/order/OrderSummary';
import PickUpPoint from '@/components/delivery/PickUpPoint';

const OrderPageClient: ComponentType = () => {
  const t = useTranslations();
  const { getOrder } = useOrderCtx();
  const params = useParams();
  const orderId = params.orderId;

  useEffect(() => {
    getOrder(orderId as string);
  }, []);

  const getStatus = useOrderStore(s => s.getStatus);
  const isProcessing = getStatus === EStatus.PROCESSING;
  const isSuccess = getStatus === EStatus.SUCCESS;
  const order = useOrderStore(s => s.order);

  return (
    <div>
      <h1>
        {t('order_page.title')}
      </h1>
      {isProcessing ? '...' : (isSuccess && order) ? (
        <>
          <OrderItemList orderItems={order.items} />
          <DeliveryMethod deliveryMethod={order.deliveryMethod!} />
          {order.pickUpPoint && <PickUpPoint pickUpPoint={order.pickUpPoint} />}
          <DeliveryAddress deliveryMethod={order.deliveryMethod!} deliveryAddress={order.deliveryAddress!} />
          <PaymentMethod paymentMethod={order.paymentMethod!} />
          <OrderSummary order={order} />
        </>
      ) : null}
    </div>
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
