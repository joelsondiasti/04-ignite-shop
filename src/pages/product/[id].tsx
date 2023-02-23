import { stripe } from "@/lib/stripe";
import {
  DetailsPlaceholder,
  ImageContainer,
  ImagePlaceholder,
  PlaceholderContainer,
  ProductContainer,
  ProductDetails,
  Spinner,
} from "@/styles/pages/product";
import { formatPrice } from "@/utils/formatprice";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      // Se for enviar o cliente para uma rota de checkout interna utilize:
      // const router = useRouter()
      // router.push('/checkout')

      // Como o caso de uso dessa aplicação é uma rota externa. Utilize:
      window.location.href = checkoutUrl;
    } catch (err) {
      //Conectar uma ferramenta de observalidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar para o checkout");
    }
  }

  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <PlaceholderContainer>
        <ImagePlaceholder />
        <DetailsPlaceholder>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </DetailsPlaceholder>
      </PlaceholderContainer>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            {isCreatingCheckoutSession ? (
              <Spinner size={16} />
            ) : (
              "Comprar agora"
            )}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id || "";

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        // @ts-ignore
        price: formatPrice(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
