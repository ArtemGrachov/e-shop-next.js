import { ComponentType } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';

import { ProductProvider } from '@/providers/product';
import { fetchProduct } from '@/providers/product/api/fetch-product';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { useProductStore } from '@/providers/product/hooks/use-product-store';

import ProductDescription from '@/components/products/ProductDescription';

const PageProduct: ComponentType = () => {
  const t = useTranslations();
  const product = useProductStore(s => s.product);

  return (
    <>
      <h1>
        Product page
      </h1>
      {product && <ProductDescription product={product} />}
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

  const slug = params.slug as string;
  const id = slug.split('-').slice(-1)[0];

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
