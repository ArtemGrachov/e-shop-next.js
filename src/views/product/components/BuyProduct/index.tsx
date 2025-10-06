'use client';

import { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import { useCurrentVariantCtx } from '../../providers/current-variant/hooks/use-current-variant-ctx';

import { useAddToCart } from '@/hooks/cart/add-to-cart';

import FormBuyProduct, { IFormBuyOutput } from '@/components/products/FormBuyProduct';
import ProductPrice from '@/components/products/ProductPrice';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

interface IProps {
  product: IProduct;
}

const BuyProduct: ComponentType<IProps> = ({ product }) => {
  const router = useRouter();
  const locale = useLocale();
  const { currentVariant } = useCurrentVariantCtx();

  const { addToCart } = useAddToCart(product, currentVariant);

  const variantChangeHandler = (variant?: IProductVariant | null) => {
    let newPath;

    const slugId = `${product?.slug[locale]}-${product?.id}`;

    if (variant) {
      const variantSlugId = `${variant.slug[locale]}-${variant.id}`;
      newPath = pathcat('/', ROUTES.PRODUCT_VARIANT, { slugId, variantSlugId });
    } else {
      newPath = pathcat('/', ROUTES.PRODUCT, { slugId });
    }

    if (location.search) {
      newPath += location.search;
    }

    if (location.hash) {
      newPath += location.hash;
    }

    router.push(newPath);
  }

  const addToCartHandler = (result: IFormBuyOutput) => {
    addToCart(result.quantity);
  }

  return (
    <>
      {product?.variants?.length && (
        <FormBuyProduct
          product={product}
          currentVariant={currentVariant}
          onVariantSelect={variantChangeHandler}
          onSubmit={addToCartHandler}
        />
      )}
      {product && currentVariant && <ProductPrice product={product} productVariant={currentVariant} />}
    </>
  )
}

export default BuyProduct;
