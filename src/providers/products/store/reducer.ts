import { EStatus } from '@/constants/status';
import type { Reducer } from '@/types/store';
import { Action, EActions, State } from './types';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case EActions.GET: {
      return {
        ...state,
        getStatus: EStatus.PROCESSING,
      };
    }
    case EActions.GET_SUCCESS: {
      return {
        ...state,
        getStatus: EStatus.SUCCESS,
        products: action.products,
      };
    }
    case EActions.GET_ERROR: {
      return {
        ...state,
        getStatus: EStatus.ERROR,
      };
    }
    default: {
      return state;
    }
  }
}
