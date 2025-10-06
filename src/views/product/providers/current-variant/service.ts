import { useMemo} from 'react';
import { useParams } from 'next/navigation';

import type { IProduct } from '@/types/models/product';

export interface IOptions {
  product: IProduct;
}

export const useCurrentVariantService = ({ product }: IOptions) => {
  const params = useParams();

  const currentVariantSlug = useMemo(() => {
    const slug = params.slug;

    if (!slug) {
      return null;
    }

    return slug[1];
  }, [params]);

  const currentVariantId = useMemo(() => {
    if (currentVariantSlug == null) {
      return null;
    }

    const variantId = +currentVariantSlug.split('-').slice(-1)[0];

    return variantId;
  }, [currentVariantSlug]);

  const currentVariant = useMemo(() => {
    const defaultVariant = product?.variants[0];

    if (currentVariantId == null) {
      return defaultVariant;
    }

    return product?.variants.find(v => v.id === currentVariantId) ?? defaultVariant;
  }, [product, currentVariantId]);


  return {
    currentVariant,
  };
}