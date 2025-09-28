import { createStore } from 'zustand/vanilla';

import type { State, ProductStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createProductStore = (
  initState: State = defaultInitState,
) => {
  return createStore<ProductStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
