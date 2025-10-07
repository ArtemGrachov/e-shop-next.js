import { ComponentType, PropsWithChildren } from 'react';

import ProductSearch from '@/components/products/ProductSearch';

const DefaultLayout: ComponentType<PropsWithChildren> = ({ children }) => {
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
