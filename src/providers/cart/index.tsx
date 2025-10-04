import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useCartService } from './service';
import type { State } from './store/types';

export const CartContext = createContext<ReturnType<typeof useCartService>>(null as any);

interface IProps {
  initialState?: State;
}

export const CartProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useCartService(initialState);

  return (
    <CartContext.Provider value={service}>
      {children}
    </CartContext.Provider>
  )
}
