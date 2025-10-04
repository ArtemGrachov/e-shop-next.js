import { useRef } from 'react';
import { useStore } from 'zustand';

import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';

import { EActions, type State } from './store/types';
import { createDeliveryMethodsStore } from './store';

import type { IDeliveryMethod } from '@/types/models/delivery-method';

export const useDeliveryMethodsService = (initialState?: State) => {
  const httpClient = useHttpClientCtx();
  const storeRef = useRef(createDeliveryMethodsStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const getDeliveryMethods = async () => {
    try {
      dispatch({ type: EActions.GET });

      const { data } = await httpClient.get<IDeliveryMethod[]>('/delivery-methods');

      dispatch({ type: EActions.GET_SUCCESS, deliveryMethods: data });
    } catch (err) {
      dispatch({ type: EActions.GET_ERROR });
      throw err;
    }
  }

  return {
    store: storeRef.current,
    getDeliveryMethods,
  };
}
