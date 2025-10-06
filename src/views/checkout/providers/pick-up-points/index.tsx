'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { usePickUpPointsService } from './service';

export const PickUpPointsContext = createContext<ReturnType<typeof usePickUpPointsService>>(null as any);

export const PickUpPointsProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = usePickUpPointsService();

  return (
    <PickUpPointsContext.Provider value={service}>
      {children}
    </PickUpPointsContext.Provider>
  )
}
