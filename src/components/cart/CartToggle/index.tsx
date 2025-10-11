'use client';

import { ComponentType, lazy, PropsWithChildren } from 'react';
import { Cart } from 'react-bootstrap-icons';
import { useScreenSize } from 'react-screen-size-helper';

import { BREAKPOINTS } from '@/constants/screen';

import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import styles from './styles.module.scss';
import Link from 'next/link';
import { pathcat } from 'pathcat';
import { ROUTES } from '@/router/routes';

const ModalCart = lazy(() => import('@/components/modal/ModalCart'));

const CartToggle: ComponentType = () => {
  const { openModal } = useModalsCtx();
  const { isMobile, isTablet } = useScreenSize({ breakpoints: BREAKPOINTS });

  const openCartHandler = <T,>() => {
    openModal({ id: 'MODAL_CART', component: ModalCart });
  }

  const CartButton = ({ children }: PropsWithChildren) => (
    <button type="button" className={styles.cartToggle} onClick={openCartHandler}>
      {children}
    </button>
  )

  const CartLink = ({ children }: PropsWithChildren) => (
    <Link href={pathcat(ROUTES.CART, '/')} className={styles.cartToggle}>
      {children}
    </Link>
  )

  const Component = (isMobile || isTablet) ? CartButton : CartLink;

return (
  <Component>
    <Cart size={42} />
  </Component>
)
}

export default CartToggle;
