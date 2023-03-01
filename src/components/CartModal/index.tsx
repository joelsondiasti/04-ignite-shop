import * as Dialog from "@radix-ui/react-dialog";
import { SmileySad, X } from "phosphor-react";
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
  const { formattedTotalPrice, cartCount } = useShoppingCart();

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

              <CheckoutButton>Finalizar compra</CheckoutButton>
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
