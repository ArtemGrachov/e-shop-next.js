import type { EStatus } from '@/constants/status';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  status: EStatus;
  submitStatus: EStatus;
  editTokens: string[];
}

export const enum EActions {
  INIT_SUCCESS,
  SUBMIT,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR,
  EDIT,
}

export interface IInitActionSuccess extends IReducerAction<EActions.INIT_SUCCESS> {}

export interface ISubmitAction extends IReducerAction<EActions.SUBMIT> {}

export interface ISubmitSuccessAction extends IReducerAction<EActions.SUBMIT_SUCCESS> {}

export interface ISubmitErrorAction extends IReducerAction<EActions.SUBMIT_ERROR> {}

export interface IEditAction extends IReducerAction<EActions.EDIT> {
  edit: boolean;
  token: string;
}

export type Action = IInitActionSuccess |
  ISubmitAction |
  ISubmitSuccessAction |
  ISubmitErrorAction |
  IEditAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CheckoutStore = State & StoreActions;
