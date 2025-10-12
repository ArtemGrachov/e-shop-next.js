'use client';

import { ComponentType, MouseEventHandler } from 'react';
import { HeartFill } from 'react-bootstrap-icons';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import IconButton from '@/components/buttons/IconButton';

import type { IPropsWithClassName } from '@/types/other/component-props';

interface IProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const FavouritesLink: ComponentType<IProps & IPropsWithClassName> = ({ className, onClick }) => {
  const routePath = useRoutePath();

  return (
    <IconButton href={routePath(ROUTES.FAVOURITES)} tag={'Link'} className={className} onClick={onClick}>
      <HeartFill size={'100%'} />
    </IconButton>
  )
}

export default FavouritesLink;
