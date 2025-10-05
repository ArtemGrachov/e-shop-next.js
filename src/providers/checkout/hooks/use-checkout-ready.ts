import { EStatus } from '@/constants/status';

import { useCheckoutStore } from '@/providers/checkout/hooks/use-checkout-store';

export const useCheckoutReady = () => {
  const status = useCheckoutStore(s => s.status);
  const isReady = status === EStatus.SUCCESS;

  return isReady;
}
