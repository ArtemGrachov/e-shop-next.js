import { ComponentType, createContext, PropsWithChildren } from 'react';

import { IProductContext } from './types';
import { useProductService } from './service';
import type { State } from './store/types';

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
