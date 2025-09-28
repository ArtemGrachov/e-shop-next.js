import { IMedia } from './media';
import { IProductVariant } from './product-variant';
import { TextTranslation } from './translation';

export interface IProduct {
  id: string,
  name: TextTranslation;
  slug: string;
  description: TextTranslation;
  media: IMedia[];
  attributeValueIds: number;
  mainCategoryId: number;
  categoryIds: number;
  variants: IProductVariant[];
}
