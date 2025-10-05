import { IPageProps } from '@/types/other/page-props';

export interface IPageCategoryProps extends IPageProps {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}
