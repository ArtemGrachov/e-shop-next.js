import { EStatus } from '@/constants/status';
import type { ProductState } from './types';

export const defaultInitState: ProductState = {
  getStatus: EStatus.INIT,
  product: null,
};
