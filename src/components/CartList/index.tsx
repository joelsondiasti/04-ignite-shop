import Image from "next/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import {
  CartItem,
  Content,
  PriceBox,
  ProductImage,
  ScrollRoot,
  ScrollThumb,
  Scrollbar,
} from "./styles";

export function CartList() {
  const { cartDetails, removeItem } = useShoppingCart();
  const cartArray = Object.values(cartDetails!);

  return (
    <ScrollRoot>
      <Content>
        {cartArray.map((camisa) => (
          <CartItem key={camisa.id}>
            <ProductImage>
              <Image src={camisa.image!} width={94} height={94} alt="" />
              {camisa.quantity > 1 && <span>{camisa.quantity}</span>}
            </ProductImage>
            <div>
              <h2>{camisa.name}</h2>
              <PriceBox>
                <span>
                  {formatCurrencyString({
                    value: camisa.price * camisa.quantity,
                    currency: camisa.currency,
                  })}
                </span>
                {camisa.quantity > 1 && (
                  <p>
                    {camisa.quantity}x{" "}
                    {formatCurrencyString({
                      value: camisa.price,
                      currency: camisa.currency,
                    })}
                  </p>
                )}
              </PriceBox>

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
