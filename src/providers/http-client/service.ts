import { useRef } from 'react';
import { Axios } from 'axios';

import { HttpClient } from './types';

export const useHttpClientService = () => {
  const httpClient = useRef<HttpClient>(new Axios());

  return httpClient.current;
}
