'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useThemeService } from '@/providers/theme/service';

export const ThemeContext = createContext<ReturnType<typeof useThemeService>>(null as any);

export const ThemeProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useThemeService();

  return (
    <ThemeContext.Provider value={service}>
      {children}
    </ThemeContext.Provider>
  )
}
