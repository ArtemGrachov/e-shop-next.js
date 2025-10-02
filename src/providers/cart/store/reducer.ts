import type { Reducer } from '@/types/store';
import { Action, EActions, State } from './types';

export const reducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case EActions.INIT: {
      return {
        ...state,
        orderItems: action.orderItems,
      };
    }
    case EActions.ADD_PRODUCT: {
      return {
        ...state,
        orderItems: [
          ...state.orderItems,
        ],
      };
    }
    case EActions.REMOVE_ITEM: {
      return {
        ...state,
        orderItems: state.orderItems.filter(item => item.id !== action.itemId),
      };
    }
    case EActions.UPDATE_QUANTITY: {
      return {
        ...state,
        orderItems: state.orderItems.map(item => item.id === action.itemId ? { ...item, quantity: action.quantity} : item),
      };
    }
    default: {
      return state;
    }
  }
}
