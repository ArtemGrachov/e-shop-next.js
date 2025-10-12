import { createStore } from 'zustand/vanilla';

import type { State, ProductsStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createProductsStore = (
  initState: State = defaultInitState,
) => {
  return createStore<ProductsStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
