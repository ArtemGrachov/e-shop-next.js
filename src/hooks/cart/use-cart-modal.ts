import { lazy } from 'react';
import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

const ModalCart = lazy(() => import('@/components/modal/ModalCart'));

export const useCartModal = () => {
  const { openModal } = useModalsCtx();

  return () => {
    openModal({ id: 'MODAL_CART', component: ModalCart, props: { checkout: true } });
  }
}
