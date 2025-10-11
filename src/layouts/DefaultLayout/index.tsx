import { PropsWithChildren } from 'react';

import Header from '@/layouts/DefaultLayout/components/Header';
import DesktopNav from '@/layouts/DefaultLayout/components/DesktopNav';

import styles from './styles.module.scss';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.layout}>
      <Header />
      <DesktopNav />
      {children}
    </div>
  )
}

export default DefaultLayout;
