import { useEffect } from 'react';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx'
import { useFavouritesCtx } from '@/providers/favourites/hooks/use-favourites-ctx';

export const useAppInit = () => {
  const { init: initCart } = useCartCtx();
  const { init: initFavourites } = useFavouritesCtx();

  useEffect(() => {
    initCart();
    initFavourites();
  }, []);
}
