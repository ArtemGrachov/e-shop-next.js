import { TextTranslation } from '@/types/models/translation';

export interface ICategory {
  id: string;
  name: TextTranslation;
  description: TextTranslation;
  slug: TextTranslation;
  primaryMedia: number;
}
