import { IPrice } from '@/types/models/price';
import { IMedia } from './media';
import { IProductVariant } from './product-variant';
import { TextTranslation } from './translation';

export interface IProduct {
  id: string,
  name: TextTranslation;
  slug: TextTranslation;
  description: TextTranslation;
  media: IMedia[];
  attributeValueIds: number;
  mainCategoryId: number;
  categoryIds: number;
  variants: IProductVariant[];
  prices: IPrice[];
}
