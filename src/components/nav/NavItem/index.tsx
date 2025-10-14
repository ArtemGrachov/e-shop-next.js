import { ComponentType, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { ENavItemType } from '@/constants/nav';
import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';

import { INavItem } from '@/types/models/nav-item';

import styles from './styles.module.scss';

interface IProps {
  navItem: INavItem;
  onClick?: Function;
}

const NavItem: ComponentType<IProps> = ({ navItem, onClick }) => {
  const routePath = useRoutePath();
  const locale = useLocale();

  const href = useMemo(() => {
    switch (navItem.type) {
      case ENavItemType.CATALOG_CATEGORY: {
        const slug = navItem.slug?.[locale] ?? '';
        return routePath(ROUTES.CATALOG, { slugId: `${slug}-${navItem.targetId}`});
      }
      case ENavItemType.ROUTE_CATALOG: {
        return routePath(ROUTES.CATALOG, { slugId: '' });
      }
      case ENavItemType.ROUTE_HOME_PAGE: {
        return routePath(ROUTES.HOME);
      }
    }
  }, [navItem]);

  const label = navItem.name[locale];

  return (
    <Link
      href={href}
      className={styles.link}
      onClick={onClick ? () => onClick() : undefined}
    >
      {label}
    </Link>
  )
}

export default NavItem;
