import { useStore } from 'zustand';

import { useProductsCtx } from './use-products-ctx';

import type { ProductsStore } from '../store/types';

export const useProductsStore = <T,>(
  selector: (store: ProductsStore) => T,
): T => {
  const productsCtx = useProductsCtx();

  return useStore(productsCtx.store, selector);
}
