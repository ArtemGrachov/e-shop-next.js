import { ComponentType } from 'react';

import Price from '@/components/other/Price';

import type { IProductVariant } from '@/types/models/product-variant';
import type { IProduct } from '@/types/models/product';
import type { IPropsWithClassName } from '@/types/other/component-props';

interface IProps {
  product: IProduct;
  productVariant?: IProductVariant;
}

const ProductPrice: ComponentType<IProps & IPropsWithClassName> = ({ product, productVariant, className }) => {
  return (
    <Price className={className} price={productVariant?.price ?? product.price} />
  )
}

export default ProductPrice;
