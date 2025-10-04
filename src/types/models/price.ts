import { EDiscountType } from '@/constants/prices';

export interface IPrice {
  value: number;
  discount: number;
  discountType: EDiscountType;
  originalValue: number;
}
