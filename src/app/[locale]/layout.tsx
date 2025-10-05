import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { CartProvider } from '@/providers/cart';
import { FavouritesProvider } from '@/providers/favourites';
import { HttpClientProvider } from '@/providers/http-client';
import { StorageProvider } from '@/providers/storage';
import { ShopProvider } from '@/providers/shop';

import { AppProvider } from '@/providers/app';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ShopProvider>
            <HttpClientProvider>
              <StorageProvider>
                <CartProvider>
                  <FavouritesProvider>
                    <AppProvider>
                      {children}
                    </AppProvider>
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