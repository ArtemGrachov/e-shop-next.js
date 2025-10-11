'use client';

import { ComponentType } from 'react';
import clsx from 'clsx';
import { Heart, HeartFill } from 'react-bootstrap-icons';

import { useFavouritesToggle } from '@/hooks/products/use-favourites-toggle';

import type { IProduct } from '@/types/models/product';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
}

const FavouritesToggle: ComponentType<IProps & IPropsWithClassName> = ({ className, product }) => {
  const { toggleHandler, inFavourites } = useFavouritesToggle({ product });

  return (
    <button type="button" className={clsx(styles.favouritesToggle, className)} onClick={toggleHandler}>
      {inFavourites ? <HeartFill size={'100%'} /> : <Heart size={'100%'} />}
    </button>
  )
}

export default FavouritesToggle;
