import camisa from "@/assets/camisetas/3.png";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { CartItem, Content, ProductImage, ScrollRoot, ScrollThumb, Scrollbar } from "./styles";

export function CartList() {
  const camisas = [
    {
      id: 1,
      name: "Camiseta Ignite Lab | ReactJS",
      price: "R$ 59,90",
      image: camisa,
    },
    {
      id: 25,
      name: "Camiseta Ignite Lab | ReactJS",
      price: "R$ 70,00",
      image: camisa,
    },
    {
      id: 31,
      name: "Camiseta Ignite Lab | ReactJS",
      price: "R$ 42,20",
      image: camisa,
    },
    
  ];
  return (
    <ScrollRoot>
      <Content>
        {camisas.map((camisa) => (
          <CartItem key={camisa.id}>
            <ProductImage>
              <Image src={camisa.image} width={94} height={94} alt="" />
            </ProductImage>
            <div>
              <h2>{camisa.name}</h2>
              <span>{camisa.price}</span>

              <button>Remover</button>
            </div>
          </CartItem>
        ))}
      </Content>

      <Scrollbar>
        <ScrollThumb />
      </Scrollbar>

    </ScrollRoot>
  );
}
