import { styled } from "@/styles";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  transition: "all 0.5s fade-in",
  background: "rgba(0,0,0,0.4)",
});

export const Modal = styled(Dialog.Content, {
  display: "flex",
  alignItems: "center",
  background: "$gray800",
  width: "30rem",
  height: "100vh",
  zIndex: 25,
  position: "fixed",
  top: 0,
  right: 0,
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  transform: "translateX(100%)",
  transition: "all 0.8s ease-in-out",
  overflow: "hidden",

  variants: {
    open: {
      true: {
        transform: "translateX(0%)",
      },
    },
  },
});

export const Close = styled(Dialog.Close, {
  position: "absolute",
  top: 24,
  right: 24,
  background: "transparent",
  border: "none",
  color: "$gray300",
  transition: "all 1s",
  cursor: "pointer",

  "&:hover": {
    transform: "rotate(90deg)",
    color: "$white",
  },
});

export const Content = styled("div", {
  width: "100%",
  padding: "0 3rem",
  height: "calc(100vh - 6rem)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  position: "relative",

  h1: {
    fontSize: "1.25rem",
    fontWeight: 700,
    lineHeight: 1.6,
    color: "$gray100",
  },
 
});

export const Details = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "auto",

  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    h3: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },

  "div:nth-child(1)": {
    span: {
      fontSize: "$md",
    },
  },
  "div:nth-child(2)": {
    h3: {
      fontSize: "$lg",
      fontWeight: 700,
    },
    span: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
  },
});

export const CheckoutButton = styled("button", {
  borderRadius: 8,
  padding: "1.25rem 2rem",
  background: "$green500",
  borderColor: "transparent",
  cursor: "pointer",

  color: "$white",
  fontSize: "$md",
  fontWeight: 700,

  //   position: "absolute",
  //   bottom: 0,
  //   left: "3rem",
  //   right: "3rem",

  "&:hover": {
    background: "$green300",
    transition: "background 0.5s",
  },
});

export const EmptyCart = styled("div", {
  // display: "flex",
  // flexDirection: "column",
  // flex: 1,

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",


  flex: 1,

  width: "100%",
  height: "100%",
 
  color: "$gray900",

  h3: {
    fontSize: "$lg",
    textAlign: "center"
  },
});