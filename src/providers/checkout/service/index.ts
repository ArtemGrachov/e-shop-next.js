import { useEffect } from 'react';
import { useStore } from 'zustand';

import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';
import { usePaymentMethodsCtx } from '@/providers/payment-methods/hooks/use-payment-methods-ctx';
import { useAppCtx } from '@/providers/app/hooks/use-app-ctx';
import { createCheckoutStore } from '@/providers/checkout/store';

import { useFormDeliveryAddress } from './use-form-delivery-address';
import { useFormDeliveryMethod } from './use-form-delivery-method';
import { useFormPaymentMethod } from './use-form-payment-method';

import { EActions } from '../store/types';

export const useCheckoutService = () => {
  const store = createCheckoutStore();
  const { getDeliveryMethods } = useDeliveryMethodsCtx();
  const { getPaymentMethods } = usePaymentMethodsCtx();

  const dispatch = useStore(store, s => s.dispatch);

  const { subscribe } = useAppCtx();
  const formDeliveryMethod = useFormDeliveryMethod();

  const formDeliveryAddress = useFormDeliveryAddress();
  const formPaymentMethod = useFormPaymentMethod();

  const init = () => {
    formDeliveryMethod.init();
    formDeliveryAddress.init();
    dispatch({ type: EActions.INIT_SUCCESS });
  }

  useEffect(() => {
    subscribe(() => init());
    getDeliveryMethods();
    getPaymentMethods();
  }, []);

  return {
    store,
    formDeliveryMethod,
    formDeliveryAddress,
    formPaymentMethod,
    init,
  };
}
