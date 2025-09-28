import { useRef } from 'react';

import { createProductStore } from '@/stores/product';
import type { State } from '@/stores/product/types';

import { IProductContext } from './types';

export const useProductService = (initialState?: State): IProductContext => {
  const storeRef = useRef(createProductStore(initialState));

  return {
    store: storeRef.current,
  }
}
