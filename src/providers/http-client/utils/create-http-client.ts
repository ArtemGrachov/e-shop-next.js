import { Axios, AxiosResponse } from 'axios';

export const createHttpClient = () => {
  const httpClient = new Axios({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  httpClient.interceptors.response.use(
    (response: AxiosResponse) => {
      const contentType = response.headers['content-type'];

      if (
        contentType?.includes('application/json') &&
        typeof response.data === 'string'
      ) {
        try {
          response.data = JSON.parse(response.data);
        } catch (err) {
          console.warn('Failed to parse JSON response:', err);
        }
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return httpClient;
}
