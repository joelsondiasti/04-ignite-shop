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
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    price_id: string;
    currency: "BRL";
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true);
  //     const response = await axios.post("/api/checkout", {
  //       priceId: product.defaultPriceId,
  //     });

  //     const { checkoutUrl } = response.data;

  //     // Se for enviar o cliente para uma rota de checkout interna utilize:
  //     // const router = useRouter()
  //     // router.push('/checkout')

  //     // Como o caso de uso dessa aplicação é uma rota externa. Utilize:
  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //     //Conectar uma ferramenta de observalidade (Datadog / Sentry)
  //     setIsCreatingCheckoutSession(false);
  //     alert("Falha ao redirecionar para o checkout");
  //   }
  // }
  const item = {
    ...product,
    sku: product.id,
    price: formatPrice(product.price / 100),
  };
  const { addItem } = useShoppingCart();
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
        <title>{item.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={item.image} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{item.name}</h1>
          <span>{item.price}</span>

          <p>{item.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={() => addItem({ ...product, sku: product.id })}
          >
            {isCreatingCheckoutSession ? (
              <Spinner size={16} />
            ) : (
              "Colocar na sacola"
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
        image: product.images[0],
        description: product.description,
        price: price.unit_amount,
        price_id: price.id,
        currency: "BRL",
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
