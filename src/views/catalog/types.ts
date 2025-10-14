import { IPageProps } from '@/types/other/page-props';

export interface IViewCatalogProps extends IPageProps {
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

export interface IViewCatalogOptions {
  sale?: boolean;
}
