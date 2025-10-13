'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useProductsService } from './service';

export const ProductsContext = createContext<ReturnType<typeof useProductsService>>(null as any);

export const ProductsProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useProductsService();

  return (
    <ProductsContext.Provider value={service}>
      {children}
    </ProductsContext.Provider>
  )
}
