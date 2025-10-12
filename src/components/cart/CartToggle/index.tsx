'use client';

import { ComponentType, lazy, PropsWithChildren } from 'react';
import { Cart } from 'react-bootstrap-icons';
import { useScreenSize } from 'react-screen-size-helper';

import { BREAKPOINTS } from '@/constants/screen';

import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import IconButton from '@/components/buttons/IconButton';

const ModalCart = lazy(() => import('@/components/modal/ModalCart'));

const CartToggle: ComponentType = () => {
  const { openModal } = useModalsCtx();
  const { isMobile, isTablet } = useScreenSize({ breakpoints: BREAKPOINTS });
  const routePath = useRoutePath();

  const openCartHandler = <T,>() => {
    openModal({ id: 'MODAL_CART', component: ModalCart });
  }

  const CartButton = ({ children }: PropsWithChildren) => (
    <IconButton type="button" onClick={openCartHandler} tag={'button'}>
      {children}
    </IconButton>
  )

  const CartLink = ({ children }: PropsWithChildren) => (
    <IconButton href={routePath(ROUTES.CART)} tag={'Link'}>
      {children}
    </IconButton>
  )

  const Component = (isMobile || isTablet) ? CartButton : CartLink;

return (
  <Component>
    <Cart size={42} />
  </Component>
)
}

export default CartToggle;
