import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../assets/logo.svg";
import { CartButton } from "@/components/CartButton";


globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header>
        <Link href="/">
          <Image src={logoImg} width={129} height={52} alt="" />
        </Link>
        <CartButton />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
