import { useContext } from 'react';
import { useStore } from 'zustand';

import { ProductStore } from '@/stores/product/types';
import { ProductContext } from '..';

export const useProductStore = <T,>(
  selector: (store: ProductStore) => T,
): T => {
  const productStoreCtx = useContext(ProductContext);

  return useStore(productStoreCtx.store, selector);
}
