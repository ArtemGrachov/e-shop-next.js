import { createStore } from 'zustand/vanilla';

import type { State, ReviewStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createReviewStore = (
  initState: State = defaultInitState,
) => {
  return createStore<ReviewStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
