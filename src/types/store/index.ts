export type Reducer<State, Action> = (state: State, action: Action) => State;

export interface IReducerAction<T = string> {
  type: T;
}

export type Dispatch<A> = (action: A) => void;
