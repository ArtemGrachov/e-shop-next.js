import { ComponentType } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import type { ICategory } from '@/types/models/category';

import styles from './styles.module.scss';

interface IProps {
  categories?: ICategory[];
}

const CategoryNav: ComponentType<IProps> = ({ categories }) => {
  categories = categories ?? [];

  const locale = useLocale();

  return (
    <nav>
      <ul className={styles.list}>
        {categories.map(category => {
          const slugId = `${category.slug[locale]}-${category.id}`;
          const name = category.name[locale];
          const href = pathcat('/', ROUTES.CATALOG, { slugId })

          return (
            <li key={category.id} className={styles.item}>
              <Link href={href} className={styles.link}>
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
