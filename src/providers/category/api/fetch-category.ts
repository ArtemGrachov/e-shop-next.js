import { HttpClient } from '@/providers/http-client/types';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { ICategory } from '@/types/models/category';

export interface IFetchCategoryParams {
  id: number | string;
}

export const fetchCategory = async (httpClient: HttpClient, params: IFetchCategoryParams): Promise<State> => {
  let state = defaultInitState;

  try {
    state = reducer(state, { type: EActions.GET });
    const response = await httpClient.get<ICategory>(`/categories/${params.id}`);

    state = reducer(state, { type: EActions.GET_SUCCESS, category: response.data });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_ERROR });
  }

  return state;
}
