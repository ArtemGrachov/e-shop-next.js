import { lock, unlock } from 'tua-body-scroll-lock'

import { RefObject, useEffect } from 'react';

export const useModalInit = (windowRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    lock(windowRef.current);

    return () => {
      unlock(windowRef.current);
    }
  }, []);
}
