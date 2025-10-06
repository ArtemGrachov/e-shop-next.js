import type { EStatus } from '@/constants/status';
import type { IProductsResponse } from '@/types/api/products';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  data: IProductsResponse | null;
}

export const enum EActions {
  GET,
  GET_SUCCESS,
  GET_ERROR,
}

export interface IGetSuccessAction extends IReducerAction<EActions.GET> { }

export interface IGetActionSuccess extends IReducerAction<EActions.GET_SUCCESS> {
  data: IProductsResponse;
}

export interface IGetActionError extends IReducerAction<EActions.GET_ERROR> { }

export type Action = IGetSuccessAction |
  IGetActionSuccess |
  IGetActionError;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type ProductsStore = State & StoreActions;
