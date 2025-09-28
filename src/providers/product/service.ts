import { useRef } from 'react';

import { createProductStore } from '@/stores/product';

import { IProductContext } from './types';

export const useProductService = (): IProductContext => {
  const storeRef = useRef(createProductStore());

  return {
    store: storeRef.current,
  }
}
