import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import {
  CheckoutButton,
  Close,
  Modal,
  Details,
  Content,
  Overlay,
} from "./styles";
import { CartList } from "../CartList";
interface CartModalProps {
  openState: boolean;
}

export function CartModal({ openState }: CartModalProps) {
  return (
    <Dialog.Portal>
      <Overlay />
      <Modal open={openState}>
        <Close>
          <X size={24} />
        </Close>
        <Content>
          <h1>Sacola de compras</h1>

          <CartList />

          <Details>
            <div>
              <h3>Quantidade</h3>
              <span>3 itens</span>
            </div>
            <div>
              <h3>Valor total</h3>
              <span>R$ 270,00</span>
            </div>
          </Details>

          <CheckoutButton>Finalizar compra</CheckoutButton>
        </Content>
      </Modal>
    </Dialog.Portal>
  );
}
