import { ComponentType } from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import FavouritesClientView from './client';

import type { IViewFavouritesProps } from '@/views/favourites/types';

const FavouritesView: ComponentType<IViewFavouritesProps> = (props) => {
  return (
    <FavouritesClientView {...props} />
  )
}

export default FavouritesView;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('common_meta.title_template', { title: t('view_favourites.meta_title' )}),
  };
}
