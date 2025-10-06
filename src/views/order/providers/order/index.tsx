'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useOrderService } from './service';

export const OrderContext = createContext<ReturnType<typeof useOrderService>>(null as any);

export const OrderProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useOrderService();

  return (
    <OrderContext.Provider value={service}>
      {children}
    </OrderContext.Provider>
  )
}
