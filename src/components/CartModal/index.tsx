import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { SmileySad, X } from "phosphor-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartList } from "../CartList";
import {
  CheckoutButton,
  Close,
  Content,
  Details,
  EmptyCart,
  Modal,
  Overlay,
} from "./styles";
interface CartModalProps {
  openState: boolean;
}

export function CartModal({ openState }: CartModalProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { formattedTotalPrice, clearCart, cartCount, cartDetails } =
    useShoppingCart();

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", { cartDetails });

      const { checkoutUrl } = response.data;

      // Se houver rota de saída limpa o carrinho
      checkoutUrl && clearCart();
      // Como o caso de uso dessa aplicação é uma rota externa. Utilize:
      window.location.href = checkoutUrl;
    } catch (err) {
      //Conectar uma ferramenta de observalidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar para o checkout");
    }
  }

  let cartQuantityString = (quantity?: number) => {
    if (quantity === 0 || undefined) return "-";
    if (quantity === 1) {
      return `${quantity} item`;
    } else {
      return `${quantity} itens`;
    }
  };

  let hasItemsInCart = cartCount && cartCount > 0;

  return (
    <Dialog.Portal>
      <Overlay />
      <Modal open={openState}>
        <Close>
          <X size={24} />
        </Close>
        <Content>
          <h1>Sacola de compras</h1>

          {hasItemsInCart ? (
            <>
              <CartList />
              <Details>
                <div>
                  <h3>Quantidade</h3>
                  <span>{cartQuantityString(cartCount)}</span>
                </div>
                <div>
                  <h3>Valor total</h3>
                  <span>{formattedTotalPrice}</span>
                </div>
              </Details>

              <CheckoutButton onClick={() => handleCheckout()}>
                Finalizar compra
              </CheckoutButton>
            </>
          ) : (
            <EmptyCart>
              <SmileySad size={96} />
              <h3>
                A sacola ainda <br /> está vazia!
              </h3>
            </EmptyCart>
          )}
        </Content>
      </Modal>
    </Dialog.Portal>
  );
}
