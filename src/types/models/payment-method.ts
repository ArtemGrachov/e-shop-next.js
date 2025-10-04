import type { IMedia } from '@/types/models/media';
import type { TextTranslation } from '@/types/models/translation';

export interface IPaymentMethod {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  icon: IMedia;
}
