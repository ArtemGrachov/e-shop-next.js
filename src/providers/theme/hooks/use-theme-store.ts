import { useStore } from 'zustand';

import { useThemeCtx } from './use-theme-ctx';

import type { ThemeStore } from '../store/types';

export const useThemeStore = <T,>(
  selector: (store: ThemeStore) => T,
): T => {
  const themeStoreCtx = useThemeCtx();

  return useStore(themeStoreCtx.store, selector);
}
