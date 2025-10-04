import { IPrice } from '@/types/models/price';

export interface IOrderItemPrice extends IPrice {
  total: number;
}