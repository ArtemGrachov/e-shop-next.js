'use client';

import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import { ROUTES } from '@/router/routes';

import { useCurrentVariantCtx } from '../../providers/current-variant/hooks/use-current-variant-ctx';

import { useAddToCart } from '@/hooks/cart/use-add-to-cart';
import { useRoutePath } from '@/hooks/routing/use-route-path';
import { useProductInCart } from '@/hooks/cart/use-product-in-cart';

import FormBuyProduct, { IFormBuyOutput } from '@/views/product/components/FormBuyProduct';
import ProductPrice from '@/components/products/ProductPrice';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
}

const BuyProduct: ComponentType<IProps> = ({ product }) => {
  const locale = useLocale();
  const { currentVariant, setVariant } = useCurrentVariantCtx();
  const routePath = useRoutePath();

  const { orderItem } = useProductInCart(product, currentVariant);

  const { addToCart } = useAddToCart(product, currentVariant);

  const variantChangeHandler = (variant?: IProductVariant | null) => {
    let newPath;

    const slugId = `${product?.slug[locale]}-${product?.id}`;

    if (variant) {
      const variantSlugId = `${variant.slug[locale]}-${variant.id}`;
      newPath = routePath(ROUTES.PRODUCT_VARIANT, { slugId, variantSlugId });
    } else {
      newPath = routePath(ROUTES.PRODUCT, { slugId });
    }

    if (location.search) {
      newPath += location.search;
    }

    if (location.hash) {
      newPath += location.hash;
    }

    window.history.pushState({}, '', newPath);
    setVariant(variant);
  }

  const addToCartHandler = (result: IFormBuyOutput) => {
    addToCart(result.quantity);
  }

  return (
    <div>
      <FormBuyProduct
        className={styles.formBuyProduct}
        product={product}
        orderItem={orderItem}
        currentVariant={currentVariant}
        onVariantSelect={variantChangeHandler}
        onSubmit={addToCartHandler}
      />
      {product && currentVariant && <ProductPrice product={product} productVariant={currentVariant} />}
    </div>
  )
}

export default BuyProduct;
