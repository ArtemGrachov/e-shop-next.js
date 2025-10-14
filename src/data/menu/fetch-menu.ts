import { HttpClient } from '@/providers/http-client/types';

import type { INavItem } from '@/types/models/nav-item';

export const fetchMenu = async (httpClient: HttpClient) => {
  try {
    const { data } = await httpClient<INavItem[]>('/menu/main');

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
