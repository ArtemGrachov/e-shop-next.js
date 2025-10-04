'use client';

import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { pathcat } from 'pathcat';
import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@/router/routes';

import { ProductProvider } from '@/providers/product';
import { ReviewsProvider } from '@/providers/reviews';
import { useProductStore } from '@/providers/product/hooks/use-product-store';
import { useReviewCtx } from '@/providers/reviews/hooks/use-review-ctx';
import { useReviewStore } from '@/providers/reviews/hooks/use-review-store';

import { useAddToCart } from '@/hooks/cart/add-to-cart';

import ProductDescription from '@/components/products/ProductDescription';
import FormBuyProduct, { IFormBuyOutput } from '@/components/products/FormBuyProduct';
import ProductPrice from '@/components/products/ProductPrice';
import FavouritesToggle from '@/components/products/FavouritesToggle';
import ReviewsList from '@/components/reviews/ReviewsList';
import FormReview, { IFormReview } from '@/components/reviews/FormReview';

import type { IProductVariant } from '@/types/models/product-variant';
import { IPageProductProps } from '@/app/[locale]/products/[...slug]/types';
import type { getPageData } from './server';

const ProductPageClient: ComponentType<IPageProductProps> = () => {
  const product = useProductStore(s => s.product);
  const router = useRouter();
  const locale = useLocale();
  const { sendReview } = useReviewCtx();
  const reviewSubmitStaus = useReviewStore(s => s.submitStatus);
  const params = useParams();

  const currentVariantSlug = useMemo(() => {
    const slug = params.slug;

    if (!slug) {
      return null;
    }

    return slug[1];
  }, [params]);

  const currentVariantId = useMemo(() => {
    if (currentVariantSlug == null) {
      return null;
    }

    const variantId = +currentVariantSlug.split('-').slice(-1)[0];

    return variantId;
  }, [currentVariantSlug]);

  const currentVariant = useMemo(() => {
    const defaultVariant = product?.variants[0];

    if (currentVariantId == null) {
      return defaultVariant;
    }

    return product?.variants.find(v => v.id === currentVariantId) ?? defaultVariant;
  }, [product, currentVariantId]);

  const { addToCart } = useAddToCart(product!, currentVariant);

  const variantChangeHandler = (variant?: IProductVariant) => {
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

  const sendReviewHandler = (formValue: IFormReview) => {
    return sendReview(product!.id, formValue);
  }

  return (
    <>
      <h1>
        Product page
      </h1>
      {product && <ProductDescription product={product} productVariant={currentVariant} />}
      {product?.variants?.length && (
        <FormBuyProduct
          product={product}
          currentVariant={currentVariant}
          onVariantSelect={variantChangeHandler}
          onSubmit={addToCartHandler}
        />
      )}
      {product && currentVariant && <ProductPrice product={product} productVariant={currentVariant} />}
      {product && <FavouritesToggle product={product} />}
      {product && <ReviewsList reviews={product.reviews} />}
      <FormReview onSubmit={sendReviewHandler} submitStatus={reviewSubmitStaus} />
    </>
  )
}

const ProductPageWrapper: ComponentType<IPageProductProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <ProductProvider initialState={props.productState}>
      <ReviewsProvider>
        <ProductPageClient {...props} />
      </ReviewsProvider>
    </ProductProvider>
  )
}

export default ProductPageWrapper;