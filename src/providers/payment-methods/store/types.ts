import type { EStatus } from '@/constants/status';
import type { IPaymentMethod } from '@/types/models/payment-method';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  paymentMethods: IPaymentMethod[];
}

export const enum EActions {
  GET,
  GET_SUCCESS,
  GET_ERROR,
}

export interface IGetAction extends IReducerAction<EActions.GET> { }

export interface IGetActionSuccess extends IReducerAction<EActions.GET_SUCCESS> {
  paymentMethods: IPaymentMethod[];
}

export interface IGetActionError extends IReducerAction<EActions.GET_ERROR> { }

export type Action = IGetAction |
  IGetActionSuccess |
  IGetActionError;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type PaymentMethodsStore = State & StoreActions;
