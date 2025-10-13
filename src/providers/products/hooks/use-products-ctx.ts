import { useContext } from 'react';

import { ProductsContext } from '..';

export const useProductsCtx = () => useContext(ProductsContext);
