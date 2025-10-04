import type { IReducerAction, Dispatch } from '@/types/store';
import type { IOrder } from '@/types/models/order';

export type State = {
  order: IOrder | null;
}

export const enum EActions {
  SET,
}

export interface ISetAction extends IReducerAction<EActions.SET> {
  order: IOrder | null;
}

export type Action = ISetAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CartStore = State & StoreActions;
