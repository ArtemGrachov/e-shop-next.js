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
    case EActions.SUBMIT: {
      return {
        ...state,
        submitStatus: EStatus.PROCESSING,
      };
    }
    case EActions.SUBMIT_SUCCESS: {
      return {
        ...state,
        submitStatus: EStatus.SUCCESS,
      };
    }
    case EActions.SUBMIT_ERROR: {
      return {
        ...state,
        submitStatus: EStatus.ERROR,
      };
    }
    default: {
      return state;
    }
  }
}
