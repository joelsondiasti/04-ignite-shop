import logoImg from "@/assets/logo.svg";
import { CartButton } from "@/components/CartButton";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartModal } from "../CartModal";
import { HeaderContainer } from "./styles";

export function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} width={129} height={52} alt="" />
      </Link>
      <Dialog.Root onOpenChange={(open) => setModalIsOpen(open)}>
        <CartButton />

        <CartModal openState={modalIsOpen} />
      </Dialog.Root>
    </HeaderContainer>
  );
}
