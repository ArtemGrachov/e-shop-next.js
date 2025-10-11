import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Trash } from 'react-bootstrap-icons';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import { useRoutePath } from '@/hooks/routing/use-route-path';

import Price from '@/components/other/Price';
import CartItemCounter from '@/components/cart/CartItemCounter';

import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  orderItem: IOrderItem;
}

const CartItem: ComponentType<IProps> = ({ orderItem }) => {
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
      <Link href={href} className={styles.description}>
        <div className={styles.image}></div>
        <div className={styles.name}>
          {orderItem.name[locale]}
        </div>
      </Link>
      <div className={styles.quantity}>
        x{orderItem.quantity}
      </div>
      <Price price={orderItem.price} />
      <CartItemCounter orderItem={orderItem} />
      <button type="button" className={styles.remove} onClick={removeHandler}>
        <Trash size={24} />
      </button>
    </div>
  )
}

export default CartItem;
