import { useRef } from 'react';
import { useStore } from 'zustand';

import { ETheme, THEME_STORE_KEY } from '@/constants/theme';

import { useStorageCtx } from '@/providers/storage/hooks/use-storage-ctx';

import { createThemeStore } from './store';
import { EActions } from './store/types';

export const useThemeService = () => {
  const { getItem } = useStorageCtx();
  const storeRef = useRef<ReturnType<typeof createThemeStore>>(null);
  const { setItem } = useStorageCtx();

  const getInitialValue = () => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let theme = getItem(THEME_STORE_KEY);

    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)')) {
        theme = ETheme.DARK;
      } else if (window.matchMedia('(prefers-color-scheme: light)')) {
        theme = ETheme.LIGHT;
      }
    }

    return theme;
  }

  if (!storeRef.current) {
    storeRef.current = createThemeStore(
      typeof window === 'undefined' ? undefined : { theme: getInitialValue() }
    );
  }

  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const setTheme = (theme: ETheme) => {
    setItem(THEME_STORE_KEY, theme);
    dispatch({ type: EActions.SET, theme });
    window.__setTheme(theme);
  }

  return {
    store: storeRef.current,
    setTheme,
  };
}
