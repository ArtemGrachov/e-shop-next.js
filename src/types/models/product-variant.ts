import { IMedia } from './media';
import { IPrice } from './price';
import { TextTranslation } from './translation';

export interface IProductVariant {
  id: number;
  name: TextTranslation;
  description: TextTranslation;
  slug: TextTranslation;
  prices: IPrice[];
  media: IMedia[];
  attributeValueIds: number[];
}
