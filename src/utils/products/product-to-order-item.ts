import type { IOrderItem } from '@/types/models/order-item';
import type { IPrice } from '@/types/models/price';
import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

export const productToOrderItem = (product: IProduct, quantity: number, price: IPrice, productVariant?: IProductVariant): IOrderItem => {
  return {
    id: crypto.randomUUID(),
    name: productVariant?.name ?? product.name,
    description: productVariant?.description ?? product.description,
    slug: product.slug,
    variantSlug: productVariant?.slug,
    productId: product.id,
    productVariantId: productVariant?.id,
    media: productVariant?.media ?? product.media,
    price,
    quantity,
  };
}
