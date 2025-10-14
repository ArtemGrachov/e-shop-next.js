import { ComponentType } from 'react';

import Nav from '@/components/nav/Nav';

import type { INavItem } from '@/types/models/nav-item';

import styles from './styles.module.scss';

interface IProps {
  menu?: INavItem[];
}

const DesktopNav: ComponentType<IProps> = ({ menu }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Nav menu={menu} />
      </div>
    </nav>
  )
}

export default DesktopNav;
