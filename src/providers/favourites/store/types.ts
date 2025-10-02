import type { IProduct } from '@/types/models/product';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  productIds: Array<number | string>;
}

export const enum EActions {
  INIT,
  ADD_PRODUCT,
  REMOVE_ITEM,
  UPDATE_QUANTITY,
}

export interface IInitFavouritesAction extends IReducerAction<EActions.INIT> {
  productIds: Array<number | string>;
}

export interface IAddProductAction extends IReducerAction<EActions.ADD_PRODUCT> {
  product: IProduct;
}

export interface IRemoveProductAction extends IReducerAction<EActions.REMOVE_ITEM> {
  itemId: number;
}

export type Action = IInitFavouritesAction |
  IAddProductAction |
  IRemoveProductAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type FavouritesStore = State & StoreActions;
