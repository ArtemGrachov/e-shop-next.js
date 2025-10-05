'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useCategoriesService } from './service';
import type { State } from './store/types';

export const CategoriesContext = createContext<ReturnType<typeof useCategoriesService>>(null as any);

interface IProps {
  initialState?: State;
}

export const CategoriesProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useCategoriesService(initialState);

  return (
    <CategoriesContext.Provider value={service}>
      {children}
    </CategoriesContext.Provider>
  )
}
