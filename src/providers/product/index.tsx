import { ComponentType, createContext, PropsWithChildren } from 'react';

import { IProductContext } from './types';
import { useProductService } from './service';

export const ProductContext = createContext<IProductContext>(null as any);

export const ProductProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  const service = useProductService();

  return (
    <ProductContext.Provider value={service}>
      {children}
    </ProductContext.Provider>
  )
}
