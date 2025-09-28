import { ComponentType } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { ProductProvider } from '@/providers/product';
import { fetchProduct } from '@/providers/product/api/fetch-product';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';

const PageProduct: ComponentType = () => {
  return (
    <>
      <h1>
        Product page
      </h1>
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
