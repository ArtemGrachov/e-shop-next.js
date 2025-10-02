import { createStore } from 'zustand/vanilla';

import type { State, CartStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createCartStore = (
  initState: State = defaultInitState,
) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
