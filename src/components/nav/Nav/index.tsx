import { ComponentType } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import styles from './styles.module.scss';

interface IProps {
  onClick?: Function;
}

const Nav: ComponentType<IProps> = ({ onClick }) => {
  const t = useTranslations();

  const links = [
    {
      key: 'home',
      path: pathcat(ROUTES.HOME, '/'),
      label: t('nav.home'),
    },
    {
      key: 'catalog',
      path: pathcat(ROUTES.CATALOG, '/', { slugId: '' }),
      label: t('nav.catalog'),
    },
  ];

  return (
    <nav>
      <ul className={styles.list}>
        {links.map(link => {
          return (
            <li key={link.key} className={styles.item}>
              <Link
                href={link.path}
                className={styles.link}
                onClick={onClick ? () => onClick : undefined}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav;
