import type { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';

import { HttpClientProvider } from '@/providers/http-client';
import { MESSAGE_CONFIG } from '@/messages/config';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <HttpClientProvider>
        <Component {...pageProps} />
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
