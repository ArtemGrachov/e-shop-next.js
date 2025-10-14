import { fetchMenu } from '@/data/menu/fetch-menu';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';

export const getLayoutData = async () => {
  const httpClient = createHttpClient();

  const menuResponse = await fetchMenu(httpClient);

  return { menuResponse };
}
