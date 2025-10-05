import { useContext } from 'react';
import { useStore } from 'zustand';

import type { CategoriesStore } from '../store/types';
import { CategoriesContext } from '..';

export const useCategoriesStore = <T,>(
  selector: (store: CategoriesStore) => T,
): T => {
  const categoriesStoreCtx = useContext(CategoriesContext);

  return useStore(categoriesStoreCtx.store, selector);
}
