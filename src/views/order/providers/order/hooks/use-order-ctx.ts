import { useContext } from 'react';

import { OrderContext } from '../';

export const useOrderCtx = () => useContext(OrderContext);
