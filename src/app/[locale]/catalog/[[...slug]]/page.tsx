import { ComponentType } from 'react';

import CategoryPageWrapper from './client';
import { getPageData } from './server';

import type { IPageCategoryProps } from './types';

const CatalogPage: ComponentType<IPageCategoryProps> = async (props) => {
  const data = await getPageData(props);

  return (
    <CategoryPageWrapper {...props} {...data} />
  )
}

export default CatalogPage;
