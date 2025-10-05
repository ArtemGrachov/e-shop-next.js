import { useContext } from 'react';
import { useStore } from 'zustand';

import type { ProductsStore } from '../store/types';
import { ProductsContext } from '..';

export const useProductsStore = <T,>(
  selector: (store: ProductsStore) => T,
): T => {
  const productsStoreCtx = useContext(ProductsContext);

  return useStore(productsStoreCtx.store, selector);
}
