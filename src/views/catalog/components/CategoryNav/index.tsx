import { ComponentType } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';

import type { ICategory } from '@/types/models/category';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  categories?: ICategory[];
  onNavigate?: Function;
}

const CategoryNav: ComponentType<IProps & IPropsWithClassName> = ({ categories, className, onNavigate }) => {
  categories = categories ?? [];

  const routePath = useRoutePath();
  const locale = useLocale();

  return (
    <nav className={className}>
      <ul className={styles.list}>
        {categories.map(category => {
          const slugId = `${category.slug[locale]}-${category.id}`;
          const name = category.name[locale];
          const href = routePath(ROUTES.CATALOG, { slugId })

          return (
            <li key={category.id} className={styles.item}>
              <Link href={href} className={styles.link} onClick={onNavigate ? () => onNavigate() : undefined}>
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategoryNav;
