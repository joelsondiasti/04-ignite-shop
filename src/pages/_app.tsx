import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image src={logoImg.src} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
