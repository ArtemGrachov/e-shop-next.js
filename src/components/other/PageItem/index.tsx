import { ComponentType, PropsWithChildren } from 'react';
import Link from 'next/link';
import { PaginationModelItem } from 'ultimate-pagination';
import { UrlObject } from 'url';

import type { IPropsWithClassName } from '@/types/other/component-props';

export interface ILinkParams {
  path: string;
  params: Record<string, any>;
  pageKey?: string;
};

interface IProps {
  page: PaginationModelItem;
  linkParams?: ILinkParams;
  linkPath?: (page: PaginationModelItem) => string | UrlObject;
  onChange?: (page: PaginationModelItem) => any;
}

const PageItem: ComponentType<IProps & PropsWithChildren & IPropsWithClassName> = ({ children, page, className, linkPath, onChange }) => {
  if (page.type === 'ELLIPSIS') {
    return (
      <span className={className}>
        {children}
      </span>
    )
  }

  if (linkPath) {
    return (
      <Link href={linkPath(page)} className={className} onClick={() => onChange?.(page)}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={className} onClick={() => onChange?.(page)}>
      {children}
    </button>
  )
}

export default PageItem;
