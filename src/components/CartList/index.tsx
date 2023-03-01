import Image from "next/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import {
  CartItem,
  Content,
  ProductImage,
  ScrollRoot,
  ScrollThumb,
  Scrollbar,
} from "./styles";

export function CartList() {
  const { cartDetails, removeItem } = useShoppingCart();
  const cartArray = Object.values(cartDetails!);

  console.log(cartArray.length);
  return (
    <ScrollRoot>
      <Content>
        {cartArray.map((camisa) => (
          <CartItem key={camisa.id}>
            <ProductImage>
              <Image src={camisa.image!} width={94} height={94} alt="" />
            </ProductImage>
            <div>
              <h2>{camisa.name}</h2>
              <span>
                {formatCurrencyString({
                  value: camisa.price,
                  currency: camisa.currency,
                })}
              </span>

              <button onClick={() => removeItem(camisa.id)}>Remover</button>
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
