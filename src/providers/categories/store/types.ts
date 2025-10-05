import type { EStatus } from '@/constants/status';
import type { ICategory } from '@/types/models/category';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  getStatus: EStatus;
  categories: ICategory[];
}

export const enum EActions {
  GET,
  GET_SUCCESS,
  GET_ERROR,
}

export interface IGetSuccessAction extends IReducerAction<EActions.GET> { }

export interface IGetActionSuccess extends IReducerAction<EActions.GET_SUCCESS> {
  categories: ICategory[];
}

export interface IGetActionError extends IReducerAction<EActions.GET_ERROR> { }

export type Action = IGetSuccessAction |
  IGetActionSuccess |
  IGetActionError;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type CategoriesStore = State & StoreActions;
