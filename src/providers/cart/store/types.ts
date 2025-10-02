import type { IOrderItem } from '@/types/models/order-item';
import type { IPrice } from '@/types/models/price';
import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  orderItems: IOrderItem[];
}

export const enum EActions {
  INIT,
  ADD_PRODUCT,
  REMOVE_ITEM,
  UPDATE_QUANTITY,
}

export interface IInitCartAction extends IReducerAction<EActions.INIT> {
  orderItems: IOrderItem[];
}

export interface IAddItemAction extends IReducerAction<EActions.ADD_PRODUCT> {
  product: IProduct;
  productVariant?: IProductVariant;
  quantity: number;
  price: IPrice;
}

export interface IRemoveItemAction extends IReducerAction<EActions.REMOVE_ITEM> {
  itemId: number;
}

export interface IUpdateQuantityAction extends IReducerAction<EActions.UPDATE_QUANTITY> {
  itemId: number;
  quantity: number;
}

export type Action = IInitCartAction |
  IAddItemAction |
  IRemoveItemAction |
  IUpdateQuantityAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CartStore = State & StoreActions;
