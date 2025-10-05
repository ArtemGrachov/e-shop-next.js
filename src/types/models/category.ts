import { IMedia } from '@/types/models/media';
import { TextTranslation } from '@/types/models/translation';

export interface ICategory {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  media: IMedia[];
  primaryMedia: number;
}
