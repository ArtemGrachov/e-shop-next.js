import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Ubuntu } from 'next/font/google'

import ThemeScript from '@/scripts/ThemeScript';

import { CartProvider } from '@/providers/cart';
import { FavouritesProvider } from '@/providers/favourites';
import { HttpClientProvider } from '@/providers/http-client';
import { StorageProvider } from '@/providers/storage';
import { ShopProvider } from '@/providers/shop';
import { AppProvider } from '@/providers/app';
import { ThemeProvider } from '@/providers/theme';

import '@/styles/main.scss';

const fontUbuntu = Ubuntu({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html lang={locale} className={fontUbuntu.className} suppressHydrationWarning={true}>
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
                      <AppProvider>
                        {children}
                      </AppProvider>
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
