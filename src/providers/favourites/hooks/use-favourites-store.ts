import { useStore } from 'zustand';

import { useFavouritesCtx } from './use-favourites-ctx';
import type { FavouritesStore } from '../store/types';

export const useFavouritesStore = <T,>(
  selector: (store: FavouritesStore) => T,
): T => {
  const ctx = useFavouritesCtx();

  return useStore(ctx.store, selector);
}
