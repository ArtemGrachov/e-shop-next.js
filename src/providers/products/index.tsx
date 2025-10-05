'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useProductsService } from './service';
import type { State } from './store/types';

export const ProductsContext = createContext<ReturnType<typeof useProductsService>>(null as any);

interface IProps {
  initialState?: State;
}

export const ProductsProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useProductsService(initialState);

  return (
    <ProductsContext.Provider value={service}>
      {children}
    </ProductsContext.Provider>
  )
}
