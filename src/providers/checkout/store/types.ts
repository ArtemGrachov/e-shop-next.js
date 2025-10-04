import type { EStatus } from '@/constants/status';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  status: EStatus;
}

export const enum EActions {
  INIT_SUCCESS,
}

export interface IInitActionSuccess extends IReducerAction<EActions.INIT_SUCCESS> {}

export type Action = IInitActionSuccess;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CheckoutStore = State & StoreActions;
