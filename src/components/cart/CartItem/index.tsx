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
import DefaultImage from '@/components/media/DefaultImage';

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

  const itemName = orderItem.name?.[locale];
  const variantNameName = orderItem.variantName?.[locale];

  const displayName = useMemo(
    () => [itemName, variantNameName].filter(s => !!s).join(' - '),
    [itemName, variantNameName],
  );

  return (
    <div className={styles.cartItem}>
      <Link href={href} className={styles.description} onClick={onNavigate ? () => onNavigate() : undefined}>
        <div className={styles.imageWrap}>
          <DefaultImage
            className={styles.image}
            src={orderItem.media?.[0]?.src ?? ''}
            width={500}
            height={500}
            alt={displayName}
          />
        </div>
        <div className={styles.name}>
          {displayName}
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
