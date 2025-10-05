import { ComponentType, useMemo } from 'react';
import { UrlObject } from 'url';
import { getPaginationModel, PaginationModelItem, PaginationModelOptions } from 'ultimate-pagination';

import PageItem from '@/components/other/PageItem';

interface IProps {
  linkPath?: (page: PaginationModelItem) => string | UrlObject;
  options: PaginationModelOptions;
  onChange?: (page: PaginationModelItem) => any;
}

const Pagination: ComponentType<IProps> = ({ options, linkPath, onChange }) => {
  const pagination = useMemo(() => {
    return getPaginationModel(options);
  }, [options]);

  return (
    <div>
      <ul>
        {pagination.map((page, index) => {
          let label: number | string = page.value;

          switch (page.type) {
            case 'ELLIPSIS': {
              label = '...';
            }
            case 'FIRST_PAGE_LINK': {
              label = '<<';
            }
            case 'PREVIOUS_PAGE_LINK': {
              label = '<';
            }
            case 'NEXT_PAGE_LINK': {
              label = '>';
            }
            case 'LAST_PAGE_LINK': {
              label = '>>';
            }
          }

          return (
            <li key={index}>
              <PageItem page={page} linkPath={linkPath} onChange={onChange}>
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
