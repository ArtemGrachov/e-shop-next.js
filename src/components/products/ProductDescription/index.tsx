import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

interface IProps {
  product: IProduct;
  productVariant?: IProductVariant | null;
}

const ProductDescription: ComponentType<IProps> = ({ product, productVariant }) => {
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
