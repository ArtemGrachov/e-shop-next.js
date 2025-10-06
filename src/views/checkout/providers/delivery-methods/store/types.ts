import type { EStatus } from '@/constants/status';
import type { IDeliveryMethod } from '@/types/models/delivery-method';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  deliveryMethods: IDeliveryMethod[];
}

export const enum EActions {
  GET,
  GET_SUCCESS,
  GET_ERROR,
}

export interface IGetAction extends IReducerAction<EActions.GET> { }

export interface IGetActionSuccess extends IReducerAction<EActions.GET_SUCCESS> {
  deliveryMethods: IDeliveryMethod[];
}

export interface IGetActionError extends IReducerAction<EActions.GET_ERROR> { }

export type Action = IGetAction |
  IGetActionSuccess |
  IGetActionError;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type DeliveryMethodsStore = State & StoreActions;
