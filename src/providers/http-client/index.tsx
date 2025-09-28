import { ComponentType, createContext, PropsWithChildren } from 'react';

import { HttpClient } from './types';
import { useHttpClientService } from './service';

export const HttpClientContext = createContext<HttpClient>(null as any);

export const HttpClientProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useHttpClientService();

  return (
    <HttpClientContext.Provider value={service}>
      {children}
    </HttpClientContext.Provider>
  )
}
