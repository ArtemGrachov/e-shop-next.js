import { useContext } from 'react';

import { ShopContext } from '@/providers/shop';

export const useShopCtx = () => {
  return useContext(ShopContext);
}
