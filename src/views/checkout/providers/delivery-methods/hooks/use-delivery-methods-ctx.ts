import { useContext } from 'react';

import { DeliveryMethodsContext } from '@/views/checkout/providers/delivery-methods';

export const useDeliveryMethodsCtx = () => useContext(DeliveryMethodsContext);
