'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useAppService } from '@/providers/app/service';

export const AppContext = createContext<ReturnType<typeof useAppService>>(null as any);

export const AppProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useAppService();

  return (
    <AppContext.Provider value={service}>
      {children}
    </AppContext.Provider>
  )
}
