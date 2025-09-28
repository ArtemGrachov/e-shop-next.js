import { ComponentType, createContext, PropsWithChildren } from 'react';

import type { State } from '@/stores/product/types';

import { IProductContext } from './types';
import { useProductService } from './service';

export const ProductContext = createContext<IProductContext>(null as any);

interface IProps {
  initialState?: State;
}

export const ProductProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useProductService(initialState);

  return (
    <ProductContext.Provider value={service}>
      {children}
    </ProductContext.Provider>
  )
}
