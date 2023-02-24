import { styled } from "@/styles";

export const ButtonContainer = styled("button", {
  marginRight: "1rem",
  background: "$gray800",
  color: "$gray400",
  padding: "0.75rem",
  border: "none",
  borderRadius: 6,
  position: "relative",
  cursor: "pointer",
  
  "&:hover": {
    filter: "brightness(1.2)",
    transition: "filter 0.5s"
  },

  span: {
    position: "absolute",
    right: "-5px",
    top: "-5px",
    background: "$green500",
    color: "$gray300",
    borderRadius: "50%",
    padding: "0.2rem",
  },

  variants: {
    hasAmount: {
      true: {
        color: "$gray300",
      },
    },
  },
});
