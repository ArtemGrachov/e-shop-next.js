import { PropsWithChildren } from 'react';

import Header from './components/Header';
import DesktopNav from './components/DesktopNav';
import Footer from './components/Footer';

import { getLayoutData } from './server';

import styles from './styles.module.scss';

const DefaultLayout = async ({ children }: PropsWithChildren) => {
  const { menuResponse } = await getLayoutData();

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
        <DesktopNav menu={menuResponse} />
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout;
