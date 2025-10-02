import { createStore } from 'zustand/vanilla';

import type { State, FavouritesStore } from './types';
import { defaultInitState } from './state';
import { reducer } from './reducer';

export const createFavouritesStore = (
  initState: State = defaultInitState,
) => {
  return createStore<FavouritesStore>()((set) => ({
    ...initState,
    dispatch: action => set(state => reducer(state, action)),
  }));
}
