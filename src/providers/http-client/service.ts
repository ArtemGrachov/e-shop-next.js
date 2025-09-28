import { useRef } from 'react';

import { createHttpClient } from './utils/create-http-client';
import { HttpClient } from './types';

export const useHttpClientService = () => {
  const httpClient = useRef<HttpClient>(createHttpClient());

  return httpClient.current;
}
