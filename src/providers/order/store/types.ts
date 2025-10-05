import type { EStatus } from '@/constants/status';
import type { IOrder } from '@/types/models/order';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  order: IOrder | null;
}

export const enum EActions {
  GET,
  GET_SUCCESS,
  GET_ERROR,
}

export interface IGetAction extends IReducerAction<EActions.GET> { }

export interface IGetActionSuccess extends IReducerAction<EActions.GET_SUCCESS> {
  order: IOrder | null;
}

export interface IGetActionError extends IReducerAction<EActions.GET_ERROR> { }

export type Action = IGetAction |
  IGetActionSuccess |
  IGetActionError;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type OrderStore = State & StoreActions;
