'use client';

import { ComponentType, useMemo } from 'react';
import { pathcat } from 'pathcat';
import { UrlObject } from 'url';
import { getPaginationModel, PaginationModelItem, PaginationModelOptions } from 'ultimate-pagination';

import PageItem, { ILinkParams } from '@/components/other/PageItem';

import styles from './styles.module.scss';

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

  if (!linkPath && linkParams) {
    linkPath = (page) => {
      return pathcat('/', linkParams.path, { ...linkParams.params, [linkParams.pageKey ?? 'page']: page.value });
    }
  }

  return (
    <div>
      <ul className={styles.list}>
        {pagination.map((page, index) => {
          let label: number | string = page.value;

          switch (page.type) {
            case 'ELLIPSIS': {
              label = '...';
              break;
            }
            case 'FIRST_PAGE_LINK': {
              label = '<<';
              break;
            }
            case 'PREVIOUS_PAGE_LINK': {
              label = '<';
              break;
            }
            case 'NEXT_PAGE_LINK': {
              label = '>';
              break;
            }
            case 'LAST_PAGE_LINK': {
              label = '>>';
              break;
            }
          }

          return (
            <li key={index} className={styles.item}>
              <PageItem
                className={styles.page}
                page={page}
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
