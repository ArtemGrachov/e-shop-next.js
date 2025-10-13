import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/router/routes';

import { getRoutePath } from '@/hooks/routing/use-route-path';
import FavouritesToggle from '@/components/favourites/FavouritesToggle';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import BuyProduct from './components/BuyProduct';
import Breadcrumbs from '@/components/other/Breadcrumbs';

import ProductPageWrapper from './client';
import { getPageData } from './server';

import type { IViewProductProps } from './types';
import type { IBreadcrumb } from '@/types/other/breadcrumbs';

import styles from './styles.module.scss';

const ProductView = async (props: IViewProductProps) => {
  const [
    t,
    locale,
    params,
    searchParams,
    data,
    routePath,
  ] = await Promise.all([
    getTranslations(),
    getLocale(),
    props.params,
    props.searchParams,
    getPageData(props),
    getRoutePath(),
  ],
  ).catch(err => {
    if (err === 404) {
      return notFound();
    }

    throw err;
  });

  const product = data.product;
  const correctSlugId = `${product!.slug[locale]}-${product.id}`;
  const correctPath = routePath(ROUTES.PRODUCT, { ...searchParams, slugId: correctSlugId });

  const getProductSlugId = () => {
    const slug = params.slug;

    if (!slug) {
      return null;
    }

    return slug[0];
  };

  const splitProductSlugId = () => {
    if (productSlugId == null) {
      return [null, null];
    }

    const arr = productSlugId.split('-');

    return [
      arr.slice(0, -1).join('-'),
      arr.slice(-1)[0],
    ];
  }

  const productSlugId = getProductSlugId();
  const [productSlug] = splitProductSlugId();


  if (product.slug[locale] !== productSlug) {
    return redirect(correctPath);
  }

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('common_breadcrumbs.home'),
      path: routePath(ROUTES.HOME),
    },
    {
      label: t('common_breadcrumbs.catalog'),
      path: routePath(ROUTES.CATALOG, { slugId: '' }),
    },
    {
      label: product.name[locale],
      path: correctPath,
    },
  ];

  return (
    <ProductPageWrapper {...props} {...data}>
      <main className={styles.page}>
        <div className={styles.container}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.mediaWrap}>
                <div className={styles.media}></div>
              </div>
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
          <div className={styles.reviews}>
            <h2>
              {t('view_product.reviews')}
            </h2>
            <ProductReviews product={product} />
          </div>
        </div>
      </main>
    </ProductPageWrapper>
  )
}

export default ProductView;
