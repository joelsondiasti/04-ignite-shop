import { HomeContainer, Product, Wrapper } from "@/styles/pages/home";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { ArrowNavigation } from "@/components/ArrowNavigation";
import { stripe } from "@/lib/stripe";
import { formatPrice } from "@/utils/formatprice";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
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
        {products.map((product) => (
          <Product
            className="keen-slider__slide"
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
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
      imageUrl: product.images[0],
      // @ts-ignore
      price: formatPrice(price.unit_amount / 100),
    };
  });
  return { props: { products }, revalidate: 60 * 60 * 2 }; // 2hours
};
