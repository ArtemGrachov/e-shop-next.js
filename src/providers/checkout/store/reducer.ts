import { EStatus } from '@/constants/status';
import type { Reducer } from '@/types/store';
import { Action, EActions, State } from './types';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case EActions.INIT_SUCCESS: {
      return {
        ...state,
        status: EStatus.SUCCESS,
      };
    }
    default: {
      return state;
    }
  }
}
