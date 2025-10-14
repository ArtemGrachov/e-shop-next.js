import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Ubuntu } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata } from 'next';

import ThemeScript from '@/scripts/ThemeScript';

import { CartProvider } from '@/providers/cart';
import { FavouritesProvider } from '@/providers/favourites';
import { HttpClientProvider } from '@/providers/http-client';
import { StorageProvider } from '@/providers/storage';
import { ShopProvider } from '@/providers/shop';
import { AppProvider } from '@/providers/app';
import { ThemeProvider } from '@/providers/theme';
import { ModalsProvider } from '@/providers/modals';
import { MenuProvider } from '@/providers/menu';

import ModalRoot from '@/components/modal/ModalRoot';

import { getLayoutData } from './server';

import '@/styles/main.scss';

const fontUbuntu = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [locale, messages, { menuResponse }] = await Promise.all([getLocale(), getMessages(), getLayoutData()]);

  return (
    <html lang={locale} className={fontUbuntu.className} suppressHydrationWarning={true}>
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
      <body>
        <ThemeScript />
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ShopProvider>
            <HttpClientProvider>
              <StorageProvider>
                <CartProvider>
                  <FavouritesProvider>
                    <ThemeProvider>
                      <MenuProvider menu={menuResponse}>
                        <AppProvider>
                          <ModalsProvider>
                            {children}
                            <ModalRoot />
                          </ModalsProvider>
                        </AppProvider>
                      </MenuProvider>
                    </ThemeProvider>
                  </FavouritesProvider>
                </CartProvider>
              </StorageProvider>
            </HttpClientProvider>
          </ShopProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('common_meta.title'),
    description: t('common_meta.description'),
  };
}
