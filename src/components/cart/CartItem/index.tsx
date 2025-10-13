import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Trash } from 'react-bootstrap-icons';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import { useRoutePath } from '@/hooks/routing/use-route-path';

import Price from '@/components/other/Price';
import CartItemCounter from '@/components/cart/CartItemCounter';
import IconButton from '@/components/buttons/IconButton';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItem: IOrderItem;
  onNavigate?: Function;
}

const CartItem: ComponentType<IProps> = ({ orderItem, onNavigate }) => {
  const locale = useLocale();
  const { removeItem } = useCartCtx();
  const routePath = useRoutePath();

  const removeHandler = () => {
    removeItem(orderItem.id);
  }

  const href = useMemo(() => {
    let slugId = `${orderItem.slug[locale]}-${orderItem.productId}`;

    if (orderItem.productVariantId) {
      slugId += `/${orderItem.variantSlug![locale]}-${orderItem.productVariantId}`;
    }

    return routePath(ROUTES.PRODUCT, { slugId });
  }, [orderItem]);

  return (
    <div className={styles.cartItem}>
      <Link href={href} className={styles.description} onClick={onNavigate ? () => onNavigate() : undefined}>
        <div className={styles.image}></div>
        <div className={styles.name}>
          {orderItem.name[locale]}
        </div>
      </Link>
      <Price price={orderItem.price} />
      <CartItemCounter orderItem={orderItem} />
      <IconButton type="button" onClick={removeHandler}>
        <Trash size={'100%'} />
      </IconButton>
    </div>
  )
}

export default CartItem;
