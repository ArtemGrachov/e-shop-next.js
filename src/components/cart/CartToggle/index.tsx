'use client';

import { ComponentType } from 'react';
import { Cart } from 'react-bootstrap-icons';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import { useCartItems } from '@/hooks/cart/cart-items';
import IconButton from '@/components/buttons/IconButton';

import styles from './styles.module.scss';

const CartToggle: ComponentType = () => {
  const routePath = useRoutePath();
  const cartItems = useCartItems();
  const cartItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <IconButton href={routePath(ROUTES.CART)} tag={'Link'} className={styles.cartToggle}>
      <Cart size={42} />
      {cartItemsCount ? <span className={styles.counter}>{cartItemsCount}</span> : null}
    </IconButton>
  )
}

export default CartToggle;
