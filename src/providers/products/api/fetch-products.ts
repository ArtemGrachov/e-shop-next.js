import { HttpClient } from '@/providers/http-client/types';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { IProduct } from '@/types/models/product';

export const fetchProducts = async (httpClient: HttpClient): Promise<State> => {
  let state = defaultInitState;

  try {
    state = reducer(state, { type: EActions.GET });
    const response = await httpClient.get<IProduct[]>('/products');

    state = reducer(state, { type: EActions.GET_SUCCESS, products: response.data });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_ERROR });
  }

  return state;
}
