'use client';

import { ComponentType } from 'react';
import { HeartFill } from 'react-bootstrap-icons';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import IconButton from '@/components/buttons/IconButton';
import { IPropsWithClassName } from '@/types/other/component-props';

const FavouritesLink: ComponentType<IPropsWithClassName> = ({ className }) => {
  const routePath = useRoutePath();

  return (
    <IconButton href={routePath(ROUTES.FAVOURITES)} tag={'Link'} className={className}>
      <HeartFill size={'100%'} />
    </IconButton>
  )
}

export default FavouritesLink;
