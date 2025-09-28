import { createStore } from 'zustand/vanilla';

import { EStatus } from '@/constants/status';

import type { ProductState, ProductStore } from './types';
import { defaultInitState } from './state';

export const createProductStore = (
  initState: ProductState = defaultInitState,
) => {
  return createStore<ProductStore>()((set) => ({
    ...initState,
    getProduct: () => set({ getStatus: EStatus.PROCESSING }),
    getProductSuccess: (product) => set({ product }),
    getProductError: () => set({ getStatus: EStatus.ERROR }),
  }));
}
