'use client';

import { ComponentType, createContext, PropsWithChildren } from 'react';

import { IOptions, useReviewService } from './service';
import type { State } from './store/types';

export const ReviewsContext = createContext<ReturnType<typeof useReviewService>>(null as any);

interface IProps extends IOptions {
  initialState?: State;
}

export const ReviewsProvider: ComponentType<PropsWithChildren & IProps> = (props) => {
  const service = useReviewService(props);

  return (
    <ReviewsContext.Provider value={service}>
      {props.children}
    </ReviewsContext.Provider>
  )
}
