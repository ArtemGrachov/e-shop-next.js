import { ComponentType } from 'react';
import { pathcat } from 'pathcat';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { IModalProps } from '@/providers/modals/types';

import { useCartItems } from '@/hooks/cart/cart-items';
import { useRoutePath } from '@/hooks/routing/use-route-path';

import Modal from '@/components/modal/Modal';
import ModalWindow from '@/components/modal/ModalWindow';
import CartList from '@/components/cart/CartList';
import OrderSummary from '@/components/order/OrderSummary';
import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';

export interface IProps {
  checkout?: boolean;
}

const ModalCart: ComponentType<IProps & IModalProps> = (props) => {
  const t = useTranslations();
  const routePath = useRoutePath();

  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();

  return (
    <Modal>
      <ModalWindow backdrop={true} {...props} className={styles.modalCart}>
        <div className={styles.content}>
          <CartList orderItems={cartItems} />
        </div>
        <div className={styles.footer}>
          {order && <OrderSummary order={order} className={styles.orderSummary} />}
          {props.checkout ? (
              <Button tag={'button'} onClick={props.close}>
                {t('modal_cart.return')}
              </Button>
          ) : (
            <>
              <Button
                href={routePath(ROUTES.FAVOURITES)}
                className={styles.link}
                tag={'Link'}
                variant={'primary'}
                onClick={props.close}
              >
                {t('modal_cart.checkout')}
              </Button>
              <Button tag={'button'} onClick={props.close}>
                {t('modal_cart.continue')}
              </Button>
            </>
          )}
        </div>
      </ModalWindow>
    </Modal>
  )
}

export default ModalCart;
