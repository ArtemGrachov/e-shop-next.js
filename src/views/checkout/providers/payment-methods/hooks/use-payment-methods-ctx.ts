import { useContext } from 'react';

import { PaymentMethodsContext } from '..';

export const usePaymentMethodsCtx = () => useContext(PaymentMethodsContext);
