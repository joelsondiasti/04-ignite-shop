import { createStitches } from "@stitches/react";

export const { config, css, styled, globalCss, keyframes, getCssText } =
  createStitches({
    theme: {
      colors: {
        white: "#fff",

        gray900: "#121214",
        gray700: "#191915",
        gray800: "#202024",
        gray400: "#8d8d99",
        gray300: "#c4c4cc",
        gray100: "#e1e1e6",

        green500: "#00875f",
        green300: "#00b37e",
      },
      fontSizes: {
        sm: "0.75rem",   // 14
        md: "1.125rem", // 18
        lg: "1.25rem",  // 20
        xl: "1.5rem",   // 24
        "2xl": "2rem",  // 32
      },
    },
  });
