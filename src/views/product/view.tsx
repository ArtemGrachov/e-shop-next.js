import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/router/routes';

import { getRoutePath } from '@/hooks/routing/use-route-path';
import FavouritesToggle from '@/components/favourites/FavouritesToggle';
import Breadcrumbs from '@/components/other/Breadcrumbs';
import Gallery from '@/components/media/Gallery';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import BuyProduct from './components/BuyProduct';

import ProductPageWrapper from './client';
import { getPageData } from './server';

import type { IViewProductProps } from './types';
import type { IBreadcrumb } from '@/types/other/breadcrumbs';

import styles from './styles.module.scss';
import { Metadata } from 'next';

const baseData = async (props: IViewProductProps) => {
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

  const [productSlugId, variantSlugId] = params.slug;
  const productSlugArr = productSlugId.split('-');
  const variantSlugArr = variantSlugId ? variantSlugId.split('-') : null;

  const productSlug = productSlugArr.slice(0, -1).join('-');
  const productId = productSlugArr.slice(-1)[0];

  const variantSlug = variantSlugArr?.slice(0, -1).join('-');
  const variantId = variantSlugArr?.slice(-1)[0];

  const variant = product.variants?.find(v => v.id == variantId);

  const correctProductSlug = product.slug[locale];
  const correctVariantSlug = variant?.slug[locale];

  let correctSlugId = `${correctProductSlug}-${productId}`;

  if (correctVariantSlug) {
    correctSlugId += `/${correctVariantSlug}-${variantId}`;
  }

  const correctPath = routePath(ROUTES.PRODUCT, { ...searchParams, slugId: correctSlugId })

  const productName = product.name[locale];
  const description = product.description[locale];

  return {
    t,
    locale,
    params,
    searchParams,
    data,
    routePath,
    product,
    productSlugId,
    variantSlugId,
    productSlugArr,
    variantSlugArr,
    productSlug,
    productId,
    variantSlug,
    variantId,
    variant,
    correctSlugId,
    correctProductSlug,
    correctVariantSlug,
    correctPath,
    productName,
    description,
  };
}

const ProductView = async (props: IViewProductProps) => {
  const {
    t,
    locale,
    data,
    routePath,
    product,
    productSlug,
    variantSlug,
    correctProductSlug,
    correctVariantSlug,
    correctPath,
    productName,
    variant,
  } = await baseData(props);

  if (productSlug !== correctProductSlug || (variantSlug && correctVariantSlug && variantSlug !== correctVariantSlug)) {
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
      path: 'correctPath',
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
                <Gallery className={styles.mediaGallery} media={product.media} />
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.titleRow}>
                <FavouritesToggle className={styles.favouritesToggle} product={product} />
                <h1 className={styles.title}>
                  {productName}
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

export async function generateMetadata(props: IViewProductProps): Promise<Metadata> {
  const {
    t,
    productName,
    description,
  } = await baseData(props);

  return {
    title: t('common_meta.title_template', { title: productName ?? '-' }),
    description,
  };
}
