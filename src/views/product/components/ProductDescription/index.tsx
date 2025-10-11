'use client';

import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';

import { useCurrentVariantCtx } from '../../providers/current-variant/hooks/use-current-variant-ctx';

import type { IProduct } from '@/types/models/product';
import { IPropsWithClassName } from '@/types/other/component-props';

interface IProps {
  product: IProduct;
}

const ProductDescription: ComponentType<IProps & IPropsWithClassName> = ({ product, className }) => {
  const locale = useLocale();
  const { currentVariant } = useCurrentVariantCtx();

  const productDescription = useMemo(() => {
    const descriptions = product?.description;

    if (!descriptions) {
      return null;
    }

    return descriptions[locale] ?? Object.values(descriptions)[0];
  }, [product, currentVariant, locale]);

  const variantDescription = useMemo(() => {
    const descriptions = currentVariant?.description;

    if (!descriptions) {
      return null;
    }

    return descriptions[locale] ?? Object.values(descriptions)[0];
  }, [product, currentVariant, locale]);

  return (
    <div className={className}>
      {productDescription && <div dangerouslySetInnerHTML={{ __html: productDescription }} />}
      {variantDescription && <div dangerouslySetInnerHTML={{ __html: variantDescription }} />}
    </div>
  )
}

export default ProductDescription;
