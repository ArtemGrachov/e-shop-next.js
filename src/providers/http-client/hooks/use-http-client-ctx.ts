import { useContext } from 'react';

import { HttpClientContext } from '../';

export const useHttpClientCtx = () => {
  return useContext(HttpClientContext);
}