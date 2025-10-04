import type { Reducer } from '@/types/store';
import { Action, EActions, State } from './types';

export const reducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case EActions.INIT: {
      return {
        ...state,
        productIds: action.productIds,
      };
    }
    case EActions.ADD_PRODUCT: {
      return {
        ...state,
        productIds: [
          ...state.productIds,
          action.product.id,
        ],
      };
    }
    case EActions.REMOVE_ITEM: {
      return {
        ...state,
        productIds: state.productIds.filter(id => id !== action.product.id),
      };
    }
    default: {
      return state;
    }
  }
}
