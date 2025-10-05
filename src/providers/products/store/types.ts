import type { EStatus } from '@/constants/status';
import type { IPagination } from '@/types/models/pagination';
import type { IProduct } from '@/types/models/product';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  data: IPagination<IProduct> | null;
}

export const enum EActions {
  GET,
  GET_SUCCESS,
  GET_ERROR,
}

export interface IGetSuccessAction extends IReducerAction<EActions.GET> { }

export interface IGetActionSuccess extends IReducerAction<EActions.GET_SUCCESS> {
  data: IPagination<IProduct>;
}

export interface IGetActionError extends IReducerAction<EActions.GET_ERROR> { }

export type Action = IGetSuccessAction |
  IGetActionSuccess |
  IGetActionError;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type ProductsStore = State & StoreActions;
