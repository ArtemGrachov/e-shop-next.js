import { IPageProps } from '@/types/other/page-props';

export interface IViewProductProps extends IPageProps {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
  searchParams: Promise<{}>;
}
