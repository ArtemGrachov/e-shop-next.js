import type { IMedia } from '@/types/models/media'
import type  { IOrderItemPrice } from '@/types/models/order-item-price';
import type { TextTranslation } from '@/types/models/translation'

export interface IOrderItem {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  slug: TextTranslation;
  variantSlug?: TextTranslation;
  price: IOrderItemPrice;
  productId: number | string;
  productVariantId?: number;
  media?: IMedia[];
  quantity: number;
}
