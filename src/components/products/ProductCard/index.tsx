'use client';

import { ComponentType, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import { useAddToCart } from '@/hooks/cart/use-add-to-cart';
import { useProductInCart } from '@/hooks/cart/use-product-in-cart';
import ProductPrice from '@/components/products/ProductPrice';
import FavouritesToggle from '@/components/favourites/FavouritesToggle';
import Button from '@/components/buttons/Button';

import type { IProduct } from '@/types/models/product';

import styles from './styles.module.scss';
import DefaultImage from '@/components/media/DefaultImage';

interface IProps {
  product: IProduct;
}

const ProductCard: ComponentType<IProps> = ({ product }) => {
  const locale = useLocale();
  const t = useTranslations();
  const routePath = useRoutePath();
  const variantWithPrice = useMemo(() => {
    return product.variants?.find(v => v.price);
  }, [product])

  const { addToCart } = useAddToCart(product, variantWithPrice);

  const href = useMemo(() => {
    return routePath(ROUTES.PRODUCT, { slugId: `${product.slug[locale]}-${product.id}` });
  }, [product]);

  const hasPrice = !!(product.price || variantWithPrice);

  const addToCartHandler = () => {
    addToCart(1);
  }

  const productInCart = useProductInCart(product, variantWithPrice);

  const productName = product.name[locale];

  return (
    <article className={styles.productCard}>
      <div className={styles.imageWrap}>
        <DefaultImage
          className={styles.image}
          src={product.media?.[0]?.src}
          width={500}
          height={500}
          alt={productName}
        />
      </div>
      <div className={styles.nameRow}>
        <FavouritesToggle className={styles.favouritesToggle} product={product} size={'small'} />
        <Link href={href} className={styles.link}>
          {productName}
        </Link>
      </div>
      <ProductPrice product={product} productVariant={product.variants?.[0]} />
      {productInCart.orderItem ? (
        <div className={styles.productInCart}>
          {t('product_card.product_in_cart')}
        </div>
      ) : hasPrice ? (
        <Button type="button" className={styles.addToCart} variant={'primary'} onClick={addToCartHandler}>
          {t('product_card.add_to_cart')}
        </Button>
      ) : null}
    </article>
  )
}

export default ProductCard;
