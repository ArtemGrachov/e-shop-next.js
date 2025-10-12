import { ComponentType, PropsWithChildren } from 'react';
import Link from 'next/link';
import { PaginationModelItem } from 'ultimate-pagination';
import { UrlObject } from 'url';

import { useRoutePath } from '@/hooks/routing/use-route-path';

import type { IPropsWithClassName } from '@/types/other/component-props';

export interface ILinkParams {
  path: string;
  params: Record<string, any>;
  pageKey?: string;
};

interface IProps {
  page: PaginationModelItem;
  linkParams?: ILinkParams;
  isActive?: boolean;
  linkPath?: (page: PaginationModelItem) => string | UrlObject;
  onChange?: (page: PaginationModelItem) => any;
}

const PageItem: ComponentType<IProps & PropsWithChildren & IPropsWithClassName> = ({ children, page, linkParams, isActive,  className, linkPath, onChange }) => {
  const routePath = useRoutePath();

  if (!linkPath && linkParams) {
    linkPath = (page) => {
      return routePath(linkParams.path, { ...linkParams.params, [linkParams.pageKey ?? 'page']: page.value });
    }
  }

  if (page.type === 'ELLIPSIS' || isActive) {
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
