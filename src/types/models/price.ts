import { EDiscountType } from '@/constants/prices';

export interface IPrice {
  value: number;
  currency: string;
  discount: number;
  discountType: EDiscountType;
  originalValue: number;
}
