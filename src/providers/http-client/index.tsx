'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useHttpClientService } from './service';

export const HttpClientContext = createContext<ReturnType<typeof useHttpClientService>>(null as any);

export const HttpClientProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useHttpClientService();

  return (
    <HttpClientContext.Provider value={service}>
      {children}
    </HttpClientContext.Provider>
  )
}
