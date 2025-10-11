'use client';

import { useModalService } from '@/providers/modals/service';
import { ComponentType, createContext, PropsWithChildren } from 'react';

export const ModalsContext = createContext<ReturnType<typeof useModalService>>(null as any);

export const ModalsProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useModalService();

  return (
    <ModalsContext.Provider value={service}>
      {children}
    </ModalsContext.Provider>
  )
}
