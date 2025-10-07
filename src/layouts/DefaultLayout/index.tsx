import { PropsWithChildren } from 'react';

import ProductSearch from '@/components/products/ProductSearch';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <header>
        <ProductSearch />
      </header>
      {children}
    </main>
  )
}

export default DefaultLayout;
