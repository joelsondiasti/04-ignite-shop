import logoImg from "@/assets/logo.svg";
import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ItemDisplayBox,
  SuccessContainer,
} from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  quantity: number;
  products: {
    name: string;
    image: string;
  }[];
}

export default function Success(props: SuccessProps) {
  let productsToShow =
    props.products.length > 3 ? props.products.slice(0, 3) : props.products;

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <Image src={logoImg} width={130} height={52} alt="" />

        <ItemDisplayBox>
          {props.products.length > 3 && <span>+{props.quantity - 3}</span>}
          
          {productsToShow.map((product) => (
            <ImageContainer>
              <Image src={product.image} width={115} height={106} alt="" />
            </ImageContainer>
          ))}
        </ItemDisplayBox>
        <h1>Compra efetuada!</h1>
        {props.quantity > 1 ? (
          <p>
            Uhuul <strong>{props.customerName}</strong>, sua compra de{" "}
            {props.quantity} camisas já <br /> está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul <strong>{props.customerName}</strong>, sua{" "}
            <strong>{props.products[0].name}</strong> já <br /> está a caminho
            da sua casa.
          </p>
        )}
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const purchasedProducts = session.line_items?.data;

  const quantityItems =
    purchasedProducts?.reduce((total, current) => {
      return total + current.quantity!;
    }, 0) || 0;

  const productsDetails = purchasedProducts?.map((product) => {
    let detail = product.price?.product as Stripe.Product;
    return {
      name: detail.name,
      image: detail.images[0],
    };
  });

  return {
    props: {
      customerName,
      quantity: quantityItems,
      products: productsDetails,
    },
  };
};
