import { ComponentType } from 'react';

import Price from '@/components/other/Price';

import type { IProductVariant } from '@/types/models/product-variant';
import { IProduct } from '@/types/models/product';

interface IProps {
  product: IProduct;
  productVariant?: IProductVariant;
}

const ProductPrice: ComponentType<IProps> = ({ product, productVariant }) => {
  return (
    <Price price={productVariant?.price ?? product.price} />
  )
}

export default ProductPrice;
