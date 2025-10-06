import type { IPrice } from './price';
import type { IMedia } from './media';
import type { IProductVariant } from './product-variant';
import type { TextTranslation } from './translation';
import type { IReview } from './review';

export interface IProduct {
  id: string | number;
  name: TextTranslation;
  slug: TextTranslation;
  description: TextTranslation;
  media: IMedia[];
  mainCategoryId: number;
  categoryIds: Array<string | number>;
  variants: IProductVariant[];
  price: IPrice;
  reviews?: IReview[];
}
