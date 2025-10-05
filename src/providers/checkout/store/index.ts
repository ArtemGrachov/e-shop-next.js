import { createStore } from 'zustand/vanilla';

import type { State, CheckoutStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createCheckoutStore = (
  initState: State = defaultInitState,
) => {
  return createStore<CheckoutStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
