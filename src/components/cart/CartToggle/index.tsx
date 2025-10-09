'use client';

import { ComponentType, lazy } from 'react';
import { Cart } from 'react-bootstrap-icons';

import styles from './styles.module.scss';
import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

const ModalCart = lazy(() => import('@/components/modal/ModalCart'));

const CartToggle: ComponentType = () => {
  const { openModal } = useModalsCtx();

  const openCartHandler = <T,>() => {
    openModal({ id: 'MODAL_CART', component: ModalCart });
  }

  return (
    <button type="button" className={styles.cartToggle} onClick={openCartHandler}>
      <Cart />
    </button>
  )
}

export default CartToggle;
