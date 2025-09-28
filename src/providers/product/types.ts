import { createProductStore } from '@/stores/product';

export interface IProductContext {
  store: ReturnType<typeof createProductStore>;
}
