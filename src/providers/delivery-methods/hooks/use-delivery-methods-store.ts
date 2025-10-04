import { useStore } from 'zustand';

import { useDeliveryMethodsCtx } from './use-delivery-methods-ctx';

import type { DeliveryMethodsStore } from '../store/types';

export const useDeliveryMethodsStore = <T,>(
  selector: (store: DeliveryMethodsStore) => T,
): T => {
  const deliveryMethodsStoreCtx = useDeliveryMethodsCtx();

  return useStore(deliveryMethodsStoreCtx.store, selector);
}
