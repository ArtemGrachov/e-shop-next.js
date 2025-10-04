import type { IMedia } from '@/types/models/media';
import type { IPrice } from '@/types/models/price';
import type { TextTranslation } from '@/types/models/translation';

export interface IDeliveryMethod {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  icon: IMedia;
  deliveryPrice: IPrice;
}
