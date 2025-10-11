import { createStore } from 'zustand/vanilla';

import type { State, ThemeStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createThemeStore = (
  initState: State = defaultInitState,
) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
