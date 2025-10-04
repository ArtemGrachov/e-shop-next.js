import type { IMedia } from '@/types/models/media'
import type { IPrice } from '@/types/models/price'
import type { TextTranslation } from '@/types/models/translation'

export interface IOrderItem {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  slug: TextTranslation;
  variantSlug?: TextTranslation;
  price: IPrice;
  productId: number | string;
  productVariantId?: number;
  media?: IMedia[];
  quantity: number;
}
