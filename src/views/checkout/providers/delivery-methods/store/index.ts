import { createStore } from 'zustand/vanilla';

import type { State, DeliveryMethodsStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createDeliveryMethodsStore = (
  initState: State = defaultInitState,
) => {
  return createStore<DeliveryMethodsStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
