'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { usePaymentMethodsService } from './service';

export const PaymentMethodsContext = createContext<ReturnType<typeof usePaymentMethodsService>>(null as any);

export const PaymentMethodsProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = usePaymentMethodsService();

  return (
    <PaymentMethodsContext.Provider value={service}>
      {children}
    </PaymentMethodsContext.Provider>
  )
}
