import { IPageProps } from '@/types/other/page-props';

export interface IPageCategoryProps extends IPageProps {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    ['price[min]']?: string;
    ['price[max]']?: string;
  }>
}
