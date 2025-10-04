import { useStore } from 'zustand';

import { usePaymentMethodsCtx } from './use-payment-methods-ctx';

import type { PaymentMethodsStore } from '../store/types';

export const usePaymentMethodsStore = <T,>(
  selector: (store: PaymentMethodsStore) => T,
): T => {
  const deliveryMethodsStoreCtx = usePaymentMethodsCtx();

  return useStore(deliveryMethodsStoreCtx.store, selector);
}
