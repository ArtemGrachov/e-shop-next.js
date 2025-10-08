import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import FavouritesToggle from '@/components/products/FavouritesToggle';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import BuyProduct from './components/BuyProduct';

import ProductPageWrapper from './client';
import { getPageData } from './server';

import type { IViewProductProps } from './types';

import styles from './styles.module.scss';

const ProductView = async (props: IViewProductProps) => {
  const [locale, data] = await Promise.all([
    getLocale(),
    getPageData(props)],
  ).catch(err => {
    if (err === 404) {
      return notFound();
    }

    throw err;
  });


  const product = data.product;

  return (
    <ProductPageWrapper {...props} {...data}>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.media}></div>
            </div>
            <div className={styles.col}>
              <div className={styles.titleRow}>
                <FavouritesToggle className={styles.favouritesToggle} product={product} />
                <h1 className={styles.title}>
                  {product.name[locale]}
                </h1>
              </div>
              {product && <ProductDescription className={styles.description} product={product} />}
              <BuyProduct product={product} />
            </div>
          </div>
          <ProductReviews product={product} />
        </div>
      </div>
    </ProductPageWrapper>
  )
}

export default ProductView;
