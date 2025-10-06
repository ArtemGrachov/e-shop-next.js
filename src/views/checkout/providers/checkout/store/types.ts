import type { EStatus } from '@/constants/status';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  status: EStatus;
  submitStatus: EStatus;
}

export const enum EActions {
  INIT_SUCCESS,
  SUBMIT,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR,
}

export interface IInitActionSuccess extends IReducerAction<EActions.INIT_SUCCESS> {}

export interface ISubmitAction extends IReducerAction<EActions.SUBMIT> {}

export interface ISubmitSuccessAction extends IReducerAction<EActions.SUBMIT_SUCCESS> {}

export interface ISubmitErrorAction extends IReducerAction<EActions.SUBMIT_ERROR> {}

export type Action = IInitActionSuccess |
  ISubmitAction |
  ISubmitSuccessAction |
  ISubmitErrorAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CheckoutStore = State & StoreActions;
