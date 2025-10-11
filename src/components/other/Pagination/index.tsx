'use client';

import { ComponentType, ReactNode, useMemo } from 'react';
import { UrlObject } from 'url';
import { getPaginationModel, PaginationModelItem, PaginationModelOptions } from 'ultimate-pagination';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import PageItem, { ILinkParams } from '@/components/other/PageItem';

import styles from './styles.module.scss';
import clsx from 'clsx';

interface IProps {
  options: PaginationModelOptions;
  linkParams: ILinkParams;
  linkPath?: (page: PaginationModelItem) => string | UrlObject;
  onChange?: (page: PaginationModelItem) => any;
}

const Pagination: ComponentType<IProps> = ({ options, linkParams, linkPath, onChange }) => {
  const pagination = useMemo(() => {
    return getPaginationModel(options);
  }, [options]);

  return (
    <div>
      <ul className={styles.list}>
        {pagination.map((page, index) => {
          let label: ReactNode = page.value;

          switch (page.type) {
            case 'ELLIPSIS': {
              label = '...';
              break;
            }
            case 'FIRST_PAGE_LINK': {
              label = <ChevronDoubleLeft />;
              break;
            }
            case 'PREVIOUS_PAGE_LINK': {
              label = <ChevronLeft />;
              break;
            }
            case 'NEXT_PAGE_LINK': {
              label = <ChevronRight />;
              break;
            }
            case 'LAST_PAGE_LINK': {
              label = <ChevronDoubleRight />;
              break;
            }
          }

          const isActive = options.currentPage === page.value;

          return (
            <li key={index} className={styles.item}>
              <PageItem
                className={clsx(styles.page, isActive && styles._active)}
                page={page}
                isActive={isActive}
                linkPath={linkPath}
                linkParams={linkParams}
                onChange={onChange}
              >
                {label}
              </PageItem>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Pagination;
