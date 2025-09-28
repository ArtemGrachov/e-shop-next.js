import type { EStatus } from '@/constants/status';
import type { IProduct } from '@/types/models/product';

export type ProductState = {
  getStatus: EStatus;
  product: IProduct | null;
}

export type ProductActions = {
  getProduct: () => void;
  getProductSuccess: (product: IProduct) => void;
  getProductError: () => void;
}

export type ProductStore = ProductState & ProductActions;
