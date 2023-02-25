import { styled } from "@/styles";

export const ArrowContainer = styled("button", {
  width: 136,
  color: "$white",
  border: "none",
  padding: "1rem",
  position: "absolute",

  "&:disabled": {
    display: "none",
  },

  "&:not(disabled):hover": {
    svg: {
      transform: "scale(1.2)",
      transition: "all 0.5s ease-in-out",
    },
  },

  variants: {
    direction: {
      right: {
        right: 0,
        top: 0,
        bottom: 0,
        background:
          "linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%);",
      },
      left: {
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 15,
        background:
          "linear-gradient(90deg, rgba(18, 18, 20, 0.75) 0%, rgba(18, 18, 20, 0) 100%);",
      },
    },
  },
});
