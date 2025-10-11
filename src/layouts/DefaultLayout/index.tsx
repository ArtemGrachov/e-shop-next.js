import { PropsWithChildren } from 'react';

import Header from './components/Header';
import DesktopNav from './components/DesktopNav';
import Footer from './components/Footer';

import styles from './styles.module.scss';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
        <DesktopNav />
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout;
