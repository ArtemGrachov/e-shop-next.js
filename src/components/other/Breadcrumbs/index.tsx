import { ComponentType } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronRight } from 'react-bootstrap-icons';

import type { IBreadcrumb } from '@/types/other/breadcrumbs'
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  breadcrumbs?: IBreadcrumb[];
}

const Breadcrumbs: ComponentType<IProps & IPropsWithClassName> = ({ breadcrumbs, className }) => {
  breadcrumbs = breadcrumbs ?? [];

  return (
    <div className={clsx(styles.breadcrumbs, className)}>
      <ul className={styles.list}>
        {breadcrumbs.map((breadcrumb, index) => {
          if (index < breadcrumbs.length - 1) {
            return (
              <li key={index} className={styles.item}>
                <Link href={breadcrumb.path} className={styles.link}>
                  {breadcrumb.label}
                </Link>
                <ChevronRight className={styles.arrow} size={14} />
              </li>
            )
          }

          return (
            <li key={index} className={styles.item}>
              <span className={styles.current}>
                {breadcrumb.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs;
