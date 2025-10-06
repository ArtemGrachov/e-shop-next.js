'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useDeliveryMethodsService } from './service';

export const DeliveryMethodsContext = createContext<ReturnType<typeof useDeliveryMethodsService>>(null as any);

export const DeliveryMethodsProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useDeliveryMethodsService();

  return (
    <DeliveryMethodsContext.Provider value={service}>
      {children}
    </DeliveryMethodsContext.Provider>
  )
}
