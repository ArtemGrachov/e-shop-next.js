import { ComponentType, PropsWithChildren } from 'react';
import type { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';

import { MESSAGE_CONFIG } from '@/messages/config';

import { useAppInit } from '@/hooks/common/use-app-init';

import { HttpClientProvider } from '@/providers/http-client';
import { StorageProvider } from '@/providers/storage';
import { CartProvider } from '@/providers/cart';

const Inner: ComponentType<PropsWithChildren> = ({ children }) => {
  useAppInit();
  return children;
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <HttpClientProvider>
        <StorageProvider>
          <CartProvider>
            <Inner>
              <Component {...pageProps} />
            </Inner>
          </CartProvider>
        </StorageProvider>
      </HttpClientProvider>
    </NextIntlClientProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  const locale = ctx.locale ?? ctx.defaultLocale!;
  const localeKey = MESSAGE_CONFIG[locale];

  const messages = await import(`@/messages/${localeKey}.json`);

  return {
    pageProps: {
      messages,
    },
  };
};
