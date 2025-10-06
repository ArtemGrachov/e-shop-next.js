import { getLocale } from 'next-intl/server';

import FavouritesToggle from '@/components/products/FavouritesToggle';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import BuyProduct from './components/BuyProduct';

import ProductPageWrapper from './client';
import { getPageData } from './server';

import type { IViewProductProps } from './types';

const ProductView = async (props: IViewProductProps) => {
  const [locale, data] = await Promise.all([
    getLocale(),
    getPageData(props)],
  );

  const product = data.product;

  return (
    <ProductPageWrapper {...props} {...data}>
      <h1>
        {product.name[locale]}
      </h1>
      {product && <ProductDescription product={product} />}
      <BuyProduct  product={product} />
      <FavouritesToggle product={product} />
      <ProductReviews product={product} />
    </ProductPageWrapper>
  )
}

export default ProductView;
