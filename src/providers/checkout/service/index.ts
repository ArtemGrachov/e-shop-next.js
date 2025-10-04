import { useEffect, useMemo, useState } from 'react';

import { EStatus } from '@/constants/status';

import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';
import { usePaymentMethodsStore } from '@/providers/payment-methods/hooks/use-payment-methods-store';
import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';
import { usePaymentMethodsCtx } from '@/providers/payment-methods/hooks/use-payment-methods-ctx';
import { useAppCtx } from '@/providers/app/hooks/use-app-ctx';

import { useFormDeliveryAddress } from './use-form-delivery-address';
import { useFormDeliveryMethod } from './use-form-delivery-method';
import { useFormPaymentMethod } from './use-form-payment-method';

export const useCheckoutService = () => {
  const { getDeliveryMethods } = useDeliveryMethodsCtx();
  const { getPaymentMethods } = usePaymentMethodsCtx();

  const deliveryMethodsStatus = useDeliveryMethodsStore(s => s.getStatus);
  const paymentMethodsStatus = usePaymentMethodsStore(s => s.getStatus);

  const [formsStatus, setStatus] = useState(EStatus.INIT);

  const { subscribe } = useAppCtx();
  const formDeliveryMethod = useFormDeliveryMethod();
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);

  const deliveryMethodId = formDeliveryMethod.form.watch('deliveryMethodId');

  const selectedDeliveryMethod = useMemo(() => {
    return deliveryMethods.find(deliveryMethod => deliveryMethod.id === deliveryMethodId);
  }, [deliveryMethodId, deliveryMethods]);

  const formDeliveryAddress = useFormDeliveryAddress(selectedDeliveryMethod);
  const formPaymentMethod = useFormPaymentMethod();

  const init = () => {
    formDeliveryMethod.init();
    setStatus(EStatus.SUCCESS);
  }

  useEffect(() => {
    subscribe(() => init());
    getDeliveryMethods();
    getPaymentMethods();
  }, []);

  const status = useMemo(() => {
    const statuses = [formsStatus, deliveryMethodsStatus, paymentMethodsStatus];

    if (statuses.every(s => s === EStatus.INIT)) {
      return EStatus.INIT;
    }

    if (statuses.includes(EStatus.PROCESSING)) {
      return EStatus.PROCESSING;
    }

    if (statuses.includes(EStatus.ERROR)) {
      return EStatus.ERROR;
    }

    if (statuses.every(s => s === EStatus.SUCCESS)) {
      return EStatus.SUCCESS;
    }

    return EStatus.ERROR;
  }, [formsStatus, deliveryMethodsStatus, paymentMethodsStatus]);

  return {
    status,
    formDeliveryMethod,
    formDeliveryAddress,
    formPaymentMethod,
    selectedDeliveryMethod,
    init,
  };
}
