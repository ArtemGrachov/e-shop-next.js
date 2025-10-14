import type { IMedia } from '@/types/models/media';
import type { TextTranslation } from '@/types/models/translation';

export interface IPaymentMethod {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  /**
   * Needed to handle redirect on client side
   * On real projects it is solved by backend
   */
  hasRedirect?: boolean;
}
