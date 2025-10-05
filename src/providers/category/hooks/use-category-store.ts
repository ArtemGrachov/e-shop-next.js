import { useContext } from 'react';
import { useStore } from 'zustand';

import type { CategoryStore } from '../store/types';
import { CategoryContext } from '..';

export const useCategoryStore = <T,>(
  selector: (store: CategoryStore) => T,
): T => {
  const categoryStoreCtx = useContext(CategoryContext);

  return useStore(categoryStoreCtx.store, selector);
}
