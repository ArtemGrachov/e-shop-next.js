import { useRef } from 'react';

import type { IProductContext } from './types';
import type { State } from './store/types';
import { createProductStore } from './store';

export const useProductService = (initialState?: State): IProductContext => {
  const storeRef = useRef(createProductStore(initialState));

  return {
    store: storeRef.current,
  }
}
