import { useMemo } from 'react';

import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';

import { useFormDeliveryAddress } from './use-form-delivery-address';
import { useFormDeliveryMethod } from './use-form-delivery-method';
import { useFormPaymentMethod } from './use-form-payment-method';

export const useCheckoutService = () => {
  const formDeliveryMethod = useFormDeliveryMethod();
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);

  const deliveryMethodId = formDeliveryMethod.form.watch('deliveryMethodId');

  const selectedDeliveryMethod = useMemo(() => {
    return deliveryMethods.find(deliveryMethod => deliveryMethod.id === deliveryMethodId);
  }, [deliveryMethodId, deliveryMethods]);

  const formDeliveryAddress = useFormDeliveryAddress(selectedDeliveryMethod);
  const formPaymentMethod = useFormPaymentMethod();

  return {
    formDeliveryMethod,
    formDeliveryAddress,
    formPaymentMethod,
  };
}
