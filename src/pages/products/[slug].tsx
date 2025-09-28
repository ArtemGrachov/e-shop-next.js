import { ComponentType } from 'react';

import { ProductProvider } from '@/providers/product';

const PageProduct: ComponentType = () => {
  return (
    <>
      <h1>
        Product page
      </h1>
    </>
  )
}

const Wrapper: ComponentType = () => {
  return (
    <ProductProvider>
      <PageProduct />
    </ProductProvider>
  )
}

export default Wrapper;

export const getServerSideProps = async () => {
  return { props: {} };
}
