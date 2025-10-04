import { useContext } from 'react';

import { CheckoutContext } from '../';

export const useCheckoutCtx = () => useContext(CheckoutContext);
