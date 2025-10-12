import { ReactNode } from 'react';
import { UrlObject } from 'url';

export interface IBreadcrumb {
  label: ReactNode;
  path: string | UrlObject;
}
