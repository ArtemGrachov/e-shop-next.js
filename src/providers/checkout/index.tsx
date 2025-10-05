import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useCheckoutService } from '@/providers/checkout/service';

export const CheckoutContext = createContext<ReturnType<typeof useCheckoutService>>(null as any);

export const CheckoutProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useCheckoutService();

  return (
    <CheckoutContext.Provider value={service}>
      {children}
    </CheckoutContext.Provider>
  )
}
