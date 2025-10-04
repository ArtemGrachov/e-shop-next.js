import ProductPageWrapper from '@/app/[locale]/products/[...slug]/client';
import { getPageData } from '@/app/[locale]/products/[...slug]/server';
import { IPageProductProps } from '@/app/[locale]/products/[...slug]/types';

const ProductPage = async (props: IPageProductProps) => {
  const data = await getPageData(props);

  return <ProductPageWrapper {...props} {...data} />
}

export default ProductPage;
