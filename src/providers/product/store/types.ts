import type { EStatus } from '@/constants/status';
import type { IProduct } from '@/types/models/product';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  product: IProduct | null;
}

export const enum EActions {
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
}

export interface IGetProductAction extends IReducerAction<EActions.GET_PRODUCT> { }

export interface IGetProductActionSuccess extends IReducerAction<EActions.GET_PRODUCT_SUCCESS> {
  product: IProduct;
}

export interface IGetProductActionError extends IReducerAction<EActions.GET_PRODUCT_ERROR> { }

export type Action = IGetProductAction |
  IGetProductActionSuccess |
  IGetProductActionError;

export type StoreActions = {
  dispatch: Dispatch;
}

export type ProductStore = State & StoreActions;
