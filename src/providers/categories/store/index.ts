import { createStore } from 'zustand/vanilla';

import type { State, CategoriesStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createCategoriesStore = (
  initState: State = defaultInitState,
) => {
  return createStore<CategoriesStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
