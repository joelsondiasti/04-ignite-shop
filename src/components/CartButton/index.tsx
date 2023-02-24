import { Handbag } from "phosphor-react";
import { ButtonContainer } from "./styles";

interface CartButtonProps{
    amount?: number
}

export function CartButton({amount}: CartButtonProps) {
  return (
    <ButtonContainer hasAmount={!!amount}>
      <Handbag size={24} />
      {amount && <span>{amount}</span>}
    </ButtonContainer>
  );
}
