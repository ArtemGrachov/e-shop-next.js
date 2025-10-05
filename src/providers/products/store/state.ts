import { EStatus } from '@/constants/status';
import type { State } from './types';

export const defaultInitState: State = {
  getStatus: EStatus.INIT,
  products: [],
};
