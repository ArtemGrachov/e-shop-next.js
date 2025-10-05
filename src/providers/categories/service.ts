import { useRef } from 'react';

import type { State } from './store/types';
import { createCategoriesStore } from './store';

export const useCategoriesService = (initialState?: State) => {
  const storeRef = useRef(createCategoriesStore(initialState));

  return {
    store: storeRef.current,
  }
}
