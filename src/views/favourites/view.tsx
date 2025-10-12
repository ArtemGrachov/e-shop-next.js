import { ComponentType } from 'react';
import FavouritesClientView from './client';

import type { IViewFavouritesProps } from '@/views/favourites/types';

const FavouritesView: ComponentType<IViewFavouritesProps> = (props) => {
  return (
    <FavouritesClientView {...props} />
  )
}

export default FavouritesView;
