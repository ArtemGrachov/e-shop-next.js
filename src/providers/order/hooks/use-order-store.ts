import { useStore } from 'zustand';

import { useOrderCtx } from './use-order-ctx';

import type { OrderStore } from '../store/types';

export const useOrderStore = <T,>(
  selector: (store: OrderStore) => T,
): T => {
  const orderCtx = useOrderCtx();

  return useStore(orderCtx.store, selector);
}
