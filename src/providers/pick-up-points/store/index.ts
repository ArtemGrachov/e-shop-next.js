import { createStore } from 'zustand/vanilla';

import type { State, PickUpPointsStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createPickUpPointsStore = (
  initState: State = defaultInitState,
) => {
  return createStore<PickUpPointsStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
