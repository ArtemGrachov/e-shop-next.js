import type { IPrice } from '@/types/models/price';
import type { IMedia } from './media';
import type { IProductVariant } from './product-variant';
import type { TextTranslation } from './translation';
import type { IReview } from '@/types/models/review';

export interface IProduct {
  id: string | number;
  name: TextTranslation;
  slug: TextTranslation;
  description: TextTranslation;
  media: IMedia[];
  attributeValueIds: number;
  mainCategoryId: number;
  categoryIds: number;
  variants: IProductVariant[];
  prices: IPrice[];
  reviews?: IReview[];
}
