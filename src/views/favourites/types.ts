import { IPageProps } from '@/types/other/page-props';

export interface IViewFavouritesProps extends IPageProps {
  params: Promise<{
    locale: string;
  }>;
}
