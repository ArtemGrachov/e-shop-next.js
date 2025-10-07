import { PropsWithChildren } from 'react';

import Header from '@/layouts/DefaultLayout/components/Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}

export default DefaultLayout;
