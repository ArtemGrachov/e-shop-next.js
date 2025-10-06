import { useStore } from 'zustand';

import { usePickUpPointsCtx } from './use-pick-up-points-ctx';

import type { PickUpPointsStore } from '../store/types';

export const usePickUpPointsStore = <T,>(
  selector: (store: PickUpPointsStore) => T,
): T => {
  const deliveryMethodsStoreCtx = usePickUpPointsCtx();

  return useStore(deliveryMethodsStoreCtx.store, selector);
}
