import { useEffect, useRef } from 'react';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';
import { useFavouritesCtx } from '@/providers/favourites/hooks/use-favourites-ctx';

export const useAppService = () => {
  const { init: initCart } = useCartCtx();
  const { init: initFavourites } = useFavouritesCtx();
  const initCbs = useRef<Function[]>([]);

  const init = () => {
    initCart();
    initFavourites();
    initCbs.current.forEach(cb => cb());
    initCbs.current = [];
  }

  const subscribe = (callback: Function) => {
    initCbs.current.push(callback);
  }

  useEffect(() => {
    init();
  }, []);

  return {
    subscribe,
  };
}
