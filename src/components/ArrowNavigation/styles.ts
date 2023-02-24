import { styled } from "@/styles";

export const ArrowContainer = styled("button", {
  height: "100vh",
  width: 136,
  color: "$white",
  border: "none",
  padding: "1rem",

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
        background:
          "linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%);",
      },
      left: {
        marginRight: "auto",
        background:
          "linear-gradient(90deg, rgba(18, 18, 20, 0.75) 0%, rgba(18, 18, 20, 0) 100%);",
      },
    },
  },
});
