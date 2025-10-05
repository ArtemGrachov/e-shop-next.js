import { ComponentType, PropsWithChildren } from 'react';
import Link from 'next/link';
import { PaginationModelItem } from 'ultimate-pagination';
import { UrlObject } from 'url';

interface IProps {
  page: PaginationModelItem;
  linkPath?: (page: PaginationModelItem) => string | UrlObject;
  onChange?: (page: PaginationModelItem) => any;
}

const PageItem: ComponentType<IProps & PropsWithChildren> = ({ children, page, linkPath, onChange }) => {
  if (page.type === 'ELLIPSIS') {
    return (
      <span>
        {children}
      </span>
    )
  }

  if (linkPath) {
    return (
      <Link href={linkPath(page)} onClick={() => onChange?.(page)}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={() => onChange?.(page)}>
      {children}
    </button>
  )
}

export default PageItem;
