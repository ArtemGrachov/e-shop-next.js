import { useRef } from 'react';

import type { State } from './store/types';
import { createProductsStore } from './store';

export const useProductsService = (initialState?: State) => {
  const storeRef = useRef(createProductsStore(initialState));

  return {
    store: storeRef.current,
  }
}
