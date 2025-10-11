import { DEFAULT_LOCALE } from '@/i18n/config';
import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { pathcat } from 'pathcat';

const generateRoutePath = (locale: string, pathName: string, params?: Record<string, any>) => {
  let path = pathcat('/', pathName, params ?? {});

  if (locale !== DEFAULT_LOCALE) {
    path = `/${locale}${path}`;
  }

  return path;
}

export const useRoutePath = () => {
  const locale = useLocale();

  return (pathName: string, params?: Record<string, any>) => generateRoutePath(locale, pathName, params);
}

export const getRoutePath = async () => {
  const locale = await getLocale();

  return (pathName: string, params?: Record<string, any>) => generateRoutePath(locale, pathName, params);
}
