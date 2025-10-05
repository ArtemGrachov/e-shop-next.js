import { createStore } from 'zustand/vanilla';

import type { State, CategoryStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createCategoryStore = (
  initState: State = defaultInitState,
) => {
  return createStore<CategoryStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
