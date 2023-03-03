import { CustomCartProvider } from "@/components/CustomCartProvider";
import { Header } from "@/components/Header";
import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const hideHeaderOnSuccessPage = !(router.pathname.indexOf('/success') === 0)
 
  return (
    <CustomCartProvider>
      <Container>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        {hideHeaderOnSuccessPage && <Header />}
        <Component {...pageProps} />
      </Container>
    </CustomCartProvider>
  );
}
