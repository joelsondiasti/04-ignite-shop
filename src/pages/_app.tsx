import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import logoImg from "../assets/logo.svg";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image src={logoImg} width={129} height={52} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
