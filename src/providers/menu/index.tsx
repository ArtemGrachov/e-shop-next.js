'use client'

import { ComponentType, createContext, PropsWithChildren } from 'react';

import type { INavItem } from '@/types/models/nav-item';

export const MenuContext = createContext<INavItem[]>([]);

interface IProps {
  menu: INavItem[];
}

export const MenuProvider: ComponentType<IProps & PropsWithChildren> = ({ children, menu }) => {
  return (
    <MenuContext.Provider value={menu}>
      {children}
    </MenuContext.Provider>
  )
}
