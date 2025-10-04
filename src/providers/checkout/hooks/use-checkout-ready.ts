import { useEffect, useState } from 'react';

import { EStatus } from '@/constants/status';

import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';
import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';
import { usePaymentMethodsCtx } from '@/providers/payment-methods/hooks/use-payment-methods-ctx';

export const useCheckoutReady = () => {
  const [isReady, setIsReady] = useState(false);
  const { store: checkoutStore } = useCheckoutCtx();
  const { store: deliveryMethodsStore } = useDeliveryMethodsCtx();
  const { store: paymentMethodsStore } = usePaymentMethodsCtx();

  useEffect(() => {
    let initStatus = checkoutStore.getState().status;
    let deliveryMethodsStatus = deliveryMethodsStore.getState().getStatus;
    let paymentMethodsStatus = paymentMethodsStore.getState().getStatus;

    const checkoutUnsub = checkoutStore.subscribe(s => {
      initStatus = s.status;
      calculate();
    });

    const deliveryUnsub = deliveryMethodsStore.subscribe(s => {
      deliveryMethodsStatus = s.getStatus;
      calculate();
    });

    const paymentUnsub = paymentMethodsStore.subscribe(s => {
      paymentMethodsStatus = s.getStatus;
      calculate();
    });

    const calculate = () => {
      const statuses = [initStatus, deliveryMethodsStatus, paymentMethodsStatus];

      if (statuses.every(s => s === EStatus.SUCCESS)) {
        setIsReady(true);
        unsubscribe();
      }
    }

    const unsubscribe = () => {
      checkoutUnsub();
      deliveryUnsub();
      paymentUnsub();
    }
  }, [])

  return isReady;
}
