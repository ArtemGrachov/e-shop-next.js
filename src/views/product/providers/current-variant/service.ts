import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

import { getIdFromSlug } from '@/utils/common/get-id-from-slug';

export interface IOptions {
  product: IProduct;
}

export const useCurrentVariantService = ({ product }: IOptions) => {
  const params = useParams();

  const initialSlugId = useMemo(() => {
    return params.slug?.[1]
  }, [params]);

  const initialVariantId = useMemo(() => {
    return getIdFromSlug(initialSlugId);
  }, [initialSlugId]);

  const [variantId, setVariantId] = useState<string | undefined | null>(initialVariantId);

  const currentVariant = useMemo(() => {
    const defaultVariant = product?.variants[0];

    if (variantId == null) {
      return defaultVariant;
    }

    return product?.variants.find(v => v.id == variantId) ?? defaultVariant;
  }, [product, variantId]);

  const setVariant = (productVariant?: IProductVariant | null) => {
    setVariantId(productVariant?.id);
  }

  return {
    currentVariant,
    setVariant,
  };
}