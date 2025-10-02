import { useEffect } from 'react';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx'

export const useAppInit = () => {
  const { init: initCart } = useCartCtx();

  useEffect(() => {
    initCart();
  }, []);
}
