import type { Reducer } from '@/types/store';
import { Action, EActions, State } from './types';

export const reducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case EActions.SET: {
      return {
        ...state,
        order: action.order,
      };
    }
    case EActions.SET_INITIALIZED: {
      return {
        ...state,
        isInitialized: true,
      };
    }
    default: {
      return state;
    }
  }
}
