import { createStore } from 'zustand/vanilla';

import type { State, PaymentMethodsStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createPaymentMethodsStore = (
  initState: State = defaultInitState,
) => {
  return createStore<PaymentMethodsStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
