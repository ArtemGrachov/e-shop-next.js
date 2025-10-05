'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useCategoryService } from './service';
import type { State } from './store/types';

export const CategoryContext = createContext<ReturnType<typeof useCategoryService>>(null as any);

interface IProps {
  initialState?: State;
}

export const CategoryProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useCategoryService(initialState);

  return (
    <CategoryContext.Provider value={service}>
      {children}
    </CategoryContext.Provider>
  )
}
