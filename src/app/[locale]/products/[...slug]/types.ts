import { IPageProps } from '@/types/other/page-props';

export interface IPageProductProps extends IPageProps {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}
