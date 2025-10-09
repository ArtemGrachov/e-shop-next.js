import type { ETheme } from '@/constants/theme';
import type { IReducerAction, Dispatch } from '@/types/store';

export type State = {
  theme: ETheme | null;
}

export const enum EActions {
  SET,
}

export interface ISetAction extends IReducerAction<EActions.SET> {
  theme: ETheme;
}

export type Action = ISetAction;

export type StoreActions = {
  dispatch: Dispatch<Action>;
}

export type ThemeStore = State & StoreActions;
