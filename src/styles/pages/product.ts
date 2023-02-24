import { CircleNotch } from "phosphor-react";
import { keyframes, styled } from "..";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: "calc(100vh - 7.5rem - 2rem)", // 100vh - header height - margin
  background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
      transition: "background 0.5s ease-in-out",
    },
  },
});

export const PlaceholderContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",
  height: 600,

  maxWidth: 1180,
  margin: "0 auto",
});

export const ImagePlaceholder = styled("div", {
  width: 576,

  height: 600, //656 no original
  background: "$gray800",
  borderRadius: 8,
  content: "",
});

export const DetailsPlaceholder = styled("div", {
  display: "flex",
  flexDirection: "column",
  div: {
    backgroundColor: "$gray800",
  },
  "div:nth-child(1)": {
    width: "100%",
    height: 42,
  },
  "div:nth-child(2)": {
    width: "30%",
    marginTop: "1rem",
    height: 42,
  },
  "div:nth-child(3)": {
    width: "100%",
    marginTop: "2.5rem",
    height: 132,
  },
  "div:nth-child(4)": {
    width: "100%",
    height: 56,
    marginTop: "auto",
  },
});

export const Spinner = styled(CircleNotch, {
  animation: `${spin} 1000ms`,
  animationIterationCount: "infinite",
  animationTimingFunction: "linear",
});
