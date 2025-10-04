import { ComponentType } from 'react';

import { useFavouritesToggle } from '@/hooks/products/use-favourites-toggle';

import type { IProduct } from '@/types/models/product';

interface IProps {
  product: IProduct;
}

const FavouritesToggle: ComponentType<IProps> = ({ product }) => {
  const { toggleHandler, inFavourites } = useFavouritesToggle({ product });

  return (
    <button type="button" onClick={toggleHandler}>
      {inFavourites ? '♥' : '♡'}
    </button>
  )
}

export default FavouritesToggle;
