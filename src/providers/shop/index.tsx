'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { SHOP_CONFIG } from '@/constants/shop';

export const ShopContext = createContext<typeof SHOP_CONFIG>(SHOP_CONFIG);

export const ShopProvider: ComponentType<PropsWithChildren> = ({ children }) => {
  return (
    <ShopContext.Provider value={SHOP_CONFIG}>
      {children}
    </ShopContext.Provider>
  )
}
