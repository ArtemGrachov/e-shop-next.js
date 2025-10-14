import type { ENavItemType } from '@/constants/nav';
import { TextTranslation } from '@/types/models/translation';

export interface INavItem {
  id: string;
  name: TextTranslation;
  slug?: TextTranslation;
  targetId?: string;
  type: ENavItemType;
}
