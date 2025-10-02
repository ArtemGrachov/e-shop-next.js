import type { EStatus } from '@/constants/status';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  submitStatus: EStatus;
}

export const enum EActions {
  SUBMIT,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR,
}

export interface ISubmitAction extends IReducerAction<EActions.SUBMIT> { }

export interface ISubmitSuccessAction extends IReducerAction<EActions.SUBMIT_SUCCESS> { }

export interface ISubmitErrorAction extends IReducerAction<EActions.SUBMIT_ERROR> { }

export type Action = ISubmitAction |
  ISubmitSuccessAction |
  ISubmitErrorAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type ReviewStore = State & StoreActions;
