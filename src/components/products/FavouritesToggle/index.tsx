'use client';

import { ComponentType } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';

import { useFavouritesToggle } from '@/hooks/products/use-favourites-toggle';
import IconButton from '@/components/buttons/IconButton';

import type { IProduct } from '@/types/models/product';
import type { IPropsWithClassName } from '@/types/other/component-props';

interface IProps {
  product: IProduct;
}

const FavouritesToggle: ComponentType<IProps & IPropsWithClassName> = ({ className, product }) => {
  const { toggleHandler, inFavourites } = useFavouritesToggle({ product });

  return (
    <IconButton type="button" className={className} onClick={toggleHandler}>
      {inFavourites ? <HeartFill size={'100%'} /> : <Heart size={'100%'} />}
    </IconButton>
  )
}

export default FavouritesToggle;
