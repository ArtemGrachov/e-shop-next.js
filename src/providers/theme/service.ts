import { useRef } from 'react';
import { useStore } from 'zustand';

import { ETheme, THEME_STORE_KEY } from '@/constants/theme';

import { useStorageCtx } from '@/providers/storage/hooks/use-storage-ctx';

import { createThemeStore } from './store';
import { EActions } from './store/types';

export const useThemeService = () => {
  const storeRef = useRef<ReturnType<typeof createThemeStore>>(null);
  const { setItem } = useStorageCtx();

  if (!storeRef.current) {
    storeRef.current = createThemeStore();
  }

  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const toggle = (theme: ETheme) => {
    setItem(THEME_STORE_KEY, theme);
    dispatch({ type: EActions.SET, theme });
    window.__setTheme(theme);
  }

  return {
    toggle,
  };
}
