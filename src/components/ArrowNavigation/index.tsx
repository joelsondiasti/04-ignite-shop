import { CaretLeft, CaretRight } from "phosphor-react";
import { ArrowContainer } from "./styles";
interface ArrowNavigationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

export function ArrowNavigation({ direction, ...rest }: ArrowNavigationProps) {
  let Direction;
  if (direction === "left") {
    Direction = CaretLeft;
  } else {
    Direction = CaretRight;
  }
  return (
    <ArrowContainer {...rest} direction={direction}>
      <Direction size={32} />
    </ArrowContainer>
  );
}
