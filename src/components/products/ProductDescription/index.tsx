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

  const productDescription = useMemo(() => {
    const descriptions = product?.description;

    if (!descriptions) {
      return null;
    }

    return descriptions[locale] ?? Object.values(descriptions)[0];
  }, [product, productVariant, locale]);

  const variantDescription = useMemo(() => {
    const descriptions = productVariant?.description;

    if (!descriptions) {
      return null;
    }

    return descriptions[locale] ?? Object.values(descriptions)[0];
  }, [product, productVariant, locale]);

  return (
    <div>
      {productDescription && <div dangerouslySetInnerHTML={{ __html: productDescription }} />}
      {variantDescription && <div dangerouslySetInnerHTML={{ __html: variantDescription }} />}
    </div>
  )
}

export default ProductDescription;
