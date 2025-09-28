import { ComponentType, useMemo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { ProductProvider } from '@/providers/product';
import { fetchProduct } from '@/providers/product/api/fetch-product';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { useProductStore } from '@/providers/product/hooks/use-product-store';

import ProductDescription from '@/components/products/ProductDescription';

const PageProduct: ComponentType = () => {
  const product = useProductStore(s => s.product);
  const router = useRouter();

  const currentVariantSlug = useMemo(() => {
    const slug = router.query.slug;

    if (!slug) {
      return null;
    }

    return slug[1];
  }, [router.query])

  const currentVariantId = useMemo(() => {
    if (currentVariantSlug == null) {
      return null;
    }

    const variantId = +currentVariantSlug.split('').slice(-1)[0];

    return variantId;
  }, [currentVariantSlug]);

  const currentVariant = useMemo(() => {
    const defaultVariant = product?.variants[0];

    if (currentVariantId == null) {
      return defaultVariant;
    }
    return product?.variants.find(v => v.id === currentVariantId) ?? defaultVariant;
  }, [product, currentVariantId]);

  return (
    <>
      <h1>
        Product page
      </h1>
      {product && <ProductDescription product={product} productVariant={currentVariant} />}
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
