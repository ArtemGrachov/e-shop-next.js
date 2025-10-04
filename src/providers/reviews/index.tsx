'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useReviewService } from './service';
import type { State } from './store/types';

export const ReviewsContext = createContext<ReturnType<typeof useReviewService>>(null as any);

interface IProps {
  initialState?: State;
}

export const ReviewsProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useReviewService(initialState);

  return (
    <ReviewsContext.Provider value={service}>
      {children}
    </ReviewsContext.Provider>
  )
}
