import { ComponentType } from 'react';

import Nav from '@/components/nav/Nav';

import styles from './styles.module.scss';

const DesktopNav: ComponentType = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Nav />
      </div>
    </nav>
  )
}

export default DesktopNav;
