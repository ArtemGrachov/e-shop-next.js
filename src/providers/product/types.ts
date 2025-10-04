import { createProductStore } from './store';

export interface IProductContext {
  store: ReturnType<typeof createProductStore>;
}
