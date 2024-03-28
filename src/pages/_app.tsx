import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.scss';
import Providers from '@/providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Head>
        <title>Face Validation</title>
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}