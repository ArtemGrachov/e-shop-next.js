import { ComponentType, useMemo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useLocale } from 'next-intl';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import { ProductProvider } from '@/providers/product';
import { fetchProduct } from '@/providers/product/api/fetch-product';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { useProductStore } from '@/providers/product/hooks/use-product-store';

import ProductDescription from '@/components/products/ProductDescription';
import FormProductVariant from '@/components/products/FormProductVariant';
import ProductPrice from '@/components/products/ProductPrice';

import type { IProductVariant } from '@/types/models/product-variant';

const PageProduct: ComponentType = () => {
  const product = useProductStore(s => s.product);
  const router = useRouter();
  const locale = useLocale();

  const currentVariantSlug = useMemo(() => {
    const slug = router.query.slug;

    if (!slug) {
      return null;
    }

    return slug[1];
  }, [router.query]);

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

    router.push(newPath, undefined, { shallow: true });
  }

  return (
    <>
      <h1>
        Product page
      </h1>
      {product && <ProductDescription product={product} productVariant={currentVariant} />}
      {product?.variants?.length && <FormProductVariant product={product} currentVariant={currentVariant} onSubmit={variantChangeHandler} />}
      {product && currentVariant && <ProductPrice product={product} productVariant={currentVariant} />}
    </>
  )
}

interface IWrapperProps {
  productState: Awaited<ReturnType<typeof fetchProduct>>;
}

export const getServerSideProps = (async ({ params }) => {
  if (!params) {
    throw new Error('404');
  }

  const httpClient = createHttpClient();

  const [productSlug] = params.slug as string[];
  const id = productSlug.split('-').slice(-1)[0];

  const productState = await fetchProduct(httpClient, { id });

  return { props: { productState } };
}) satisfies GetServerSideProps<IWrapperProps>;

const Wrapper = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ProductProvider initialState={props.productState}>
      <PageProduct />
    </ProductProvider>
  )
}

export default Wrapper;
