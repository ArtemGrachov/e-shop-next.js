import { useStore } from 'zustand';

import type { CartStore } from '../store/types';
import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

export const useCartStore = <T,>(
  selector: (store: CartStore) => T,
): T => {
  const cartStoreCtx = useCartCtx();

  return useStore(cartStoreCtx.store, selector);
}
