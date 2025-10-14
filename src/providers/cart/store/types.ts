import type { IReducerAction, Dispatch } from '@/types/store';
import type { IOrder } from '@/types/models/order';

export type State = {
  order: IOrder | null;
  isInitialized: boolean;
}

export const enum EActions {
  SET,
  SET_INITIALIZED,
}

export interface ISetInitialized extends IReducerAction<EActions.SET_INITIALIZED> { }

export interface ISetAction extends IReducerAction<EActions.SET> {
  order: IOrder | null;
}

export type Action = ISetAction | ISetInitialized;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CartStore = State & StoreActions;
