import { ComponentType } from 'react';

import NavItem from '@/components/nav/NavItem';

import type { INavItem } from '@/types/models/nav-item';

import styles from './styles.module.scss';

interface IProps {
  menu?: INavItem[];
  onClick?: Function;
}

const Nav: ComponentType<IProps> = ({ menu, onClick }) => {
  return (
    <nav>
      <ul className={styles.list}>
        {menu?.map(navItem => {
          return (
            <li key={navItem.id} className={styles.item}>
              <NavItem navItem={navItem} onClick={onClick} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav;
