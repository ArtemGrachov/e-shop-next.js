import { useStore } from 'zustand';

import { useCheckoutCtx } from './use-checkout-ctx';

import type { CheckoutStore } from '../store/types';

export const useCheckoutStore = <T,>(
  selector: (store: CheckoutStore) => T,
): T => {
  const checkoutStoreCtx = useCheckoutCtx();

  return useStore(checkoutStoreCtx.store, selector);
}
