'use client';

import { ComponentType, PropsWithChildren } from 'react';

import { useAppInit } from '@/hooks/common/use-app-init';

export const Root: ComponentType<PropsWithChildren> = ({ children }) => {
  useAppInit();

  return children;
}
