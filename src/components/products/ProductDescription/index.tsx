import { ComponentType, useMemo } from 'react';

import type { IProduct } from '@/types/models/product';
import { useLocale } from 'next-intl';
import { IProductVariant } from '../../../types/models/product-variant';

interface IProductProps {
  product: IProduct;
  productVariant?: never;
}

interface IVariantProps {
  product?: never;
  productVariant: IProductVariant;
}

type Props = | IProductProps | IVariantProps;

const ProductDescription: ComponentType<Props> = ({ product, productVariant }) => {
  const locale = useLocale();

  const outputDescription = useMemo(() => {
    const descriptions = productVariant?.description ?? product?.description;

    if (!descriptions) {
      return null;
    }

    return descriptions[locale] ?? Object.values(descriptions)[0];
  }, [product, productVariant, locale]);

  return (
    <div>
      {outputDescription}
    </div>
  )
}

export default ProductDescription;
