import { IMedia } from './media';
import { IPrice } from './price';
import { TextTranslation } from './translation';

export interface IProductVariant {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  slug: TextTranslation;
  price: IPrice;
  media: IMedia[];
}
