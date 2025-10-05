import { HttpClient } from '@/providers/http-client/types';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { ICategory } from '@/types/models/category';

export const fetchCategories = async (httpClient: HttpClient): Promise<State> => {
  let state = defaultInitState;

  try {
    state = reducer(state, { type: EActions.GET });
    const response = await httpClient.get<ICategory[]>(`/categories`);

    state = reducer(state, { type: EActions.GET_SUCCESS, categories: response.data });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_ERROR });
  }

  return state;
}
