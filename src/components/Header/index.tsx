import logoImg from "@/assets/logo.svg";
import { CartButton } from "@/components/CartButton";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartModal } from "../CartModal";
import { HeaderContainer } from "./styles";

export function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { cartDetails } = useShoppingCart();

  const amount = Object.values(cartDetails!).reduce((amount, product) => {
    amount += product.quantity;
    return amount;
  }, 0);
  console.log(amount);

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} width={129} height={52} alt="" />
      </Link>
      <Dialog.Root onOpenChange={(open) => setModalIsOpen(open)}>
        <CartButton amount={amount}/>

        <CartModal openState={modalIsOpen} />
      </Dialog.Root>
    </HeaderContainer>
  );
}
