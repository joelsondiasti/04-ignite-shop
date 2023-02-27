import { Header } from "@/components/Header";
import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CartProvider } from "use-shopping-cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const stripeKey = String(process.env.STRIPE_PUBLIC_KEY);

  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="BRL"
      shouldPersist={true}
    >
      <Container>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
