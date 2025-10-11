import type { Reducer } from '@/types/store';
import { Action, EActions, State } from './types';

export const reducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case EActions.SET: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    default: {
      return state;
    }
  }
}
