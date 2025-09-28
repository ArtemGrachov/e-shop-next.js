import type { AppProps } from 'next/app';
import { HttpClientProvider } from '@/providers/http-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HttpClientProvider>
      <Component {...pageProps} />
    </HttpClientProvider>
  )
}
