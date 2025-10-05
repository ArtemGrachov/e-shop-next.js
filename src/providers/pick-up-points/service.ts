import { useRef } from 'react';
import { useStore } from 'zustand';

import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';

import { EActions, type State } from './store/types';
import { createPickUpPointsStore } from './store';

import type { IPickUpPoint } from '@/types/models/pick-up-point';

export const usePickUpPointsService = (initialState?: State) => {
  const httpClient = useHttpClientCtx();
  const storeRef = useRef(createPickUpPointsStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const getPickUpPoints = async (deliveryMethodId: string) => {
    try {
      dispatch({ type: EActions.GET });

      const { data } = await httpClient.get<IPickUpPoint[]>('/pick-up-points', { params: { deliveryMethodId }});

      dispatch({ type: EActions.GET_SUCCESS, pickUpPoints: data });
    } catch (err) {
      dispatch({ type: EActions.GET_ERROR });
      throw err;
    }
  }

  return {
    store: storeRef.current,
    getPickUpPoints,
  };
}
