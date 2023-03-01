import {
  CartButton,
  HomeContainer,
  Product,
  Wrapper,
} from "@/styles/pages/home";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { ArrowNavigation } from "@/components/ArrowNavigation";
import { stripe } from "@/lib/stripe";
import { formatPrice } from "@/utils/formatprice";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    currency: "BRL";
  }[];
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const { addItem } = useShoppingCart();

  const productList = products.map((product) => {
    return {
      item: { ...product, sku: product.id },
      price: formatPrice(product.price / 100),
    };
  });

  return (
    <Wrapper>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      {loaded && instanceRef.current && (
        <ArrowNavigation
          direction="left"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        />
      )}

      <HomeContainer ref={sliderRef} className="keen-slider">
        {productList.map(({ item, price }) => (
          <Product className="keen-slider__slide" key={item.id}>
            <Link href={`/product/${item.id}`} prefetch={false}>
              <Image src={item.image} width={520} height={480} alt="" />
            </Link>
            <footer>
              <div>
                <strong>{item.name}</strong>
                <span>{price}</span>
              </div>
              <CartButton onClick={() => addItem(item)}>
                <Handbag size={32} />
              </CartButton>
            </footer>
          </Product>
        ))}
      </HomeContainer>

      {loaded && instanceRef.current && (
        <ArrowNavigation
          direction="right"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          disabled={
            currentSlide === instanceRef.current.track.details.slides.length - 3
          }
        />
      )}
    </Wrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      description: product.description,
      price: price.unit_amount,
      currency: "BRL",
    };
  });
  return { props: { products }, revalidate: 60 * 60 * 2 }; // 2hours
};
