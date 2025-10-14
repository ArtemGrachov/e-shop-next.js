import type { IMedia } from '@/types/models/media'
import type  { IOrderItemPrice } from '@/types/models/order-item-price';
import type { TextTranslation } from '@/types/models/translation'

export interface IOrderItem {
  id: string;
  name?: TextTranslation;
  variantName?: TextTranslation;
  description: TextTranslation;
  slug: TextTranslation;
  variantSlug?: TextTranslation;
  price: IOrderItemPrice;
  productId: number | string;
  productVariantId?: string;
  media?: IMedia[];
  quantity: number;
}
