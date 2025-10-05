import { useRef } from 'react';

import type { State } from './store/types';
import { createCategoryStore } from './store';

export const useCategoryService = (initialState?: State) => {
  const storeRef = useRef(createCategoryStore(initialState));

  return {
    store: storeRef.current,
  }
}
