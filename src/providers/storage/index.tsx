'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';
import { useStorageService } from '@/providers/storage/service';

export const StorageContext = createContext<ReturnType<typeof useStorageService>>(null as any);

export const StorageProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useStorageService();

  return (
    <StorageContext.Provider value={service}>
      {children}
    </StorageContext.Provider>
  )
}
