import { createStore } from 'zustand/vanilla';

import type { State, OrderStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createOrderStore = (
  initState: State = defaultInitState,
) => {
  return createStore<OrderStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
