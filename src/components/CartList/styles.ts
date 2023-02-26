import { styled } from "@/styles";
import * as ScrollArea from '@radix-ui/react-scroll-area';

const SCROLLBAR_SIZE = 10;

export const ScrollRoot = styled(ScrollArea.Root, {
    width:"100%",
    minHeight: 225,
    flex: 1,
    paddingBottom: "1rem"
})

export const Content = styled(ScrollArea.Viewport, {
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  flex: 1,
  
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

export const CartItem = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  gap: "1.25rem",
  marginBottom: "1.5rem",

  div: {
    display: "flex",
    flexDirection: "column",

    h2: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    span: {
      fontSize: "1.125rem",
      fontWeight: 700,
      marginTop: "0.2rem",
    },
    button: {
      background: "transparent",
      color: "$green500",
      fontSize: "1rem",
      fontWeight: 700,
      textAlign: "left",
      width: "max-content",
      marginTop: "1rem",
      border: "none",
      cursor: "pointer",

      "&:hover": {
        color: "$green300",
        transition: "color 0.5s",
      },
    },
  },
});

export const ProductImage = styled("div", {
  background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
});

export const Scrollbar = styled(ScrollArea.Scrollbar, {
    display: 'flex',
    // ensures no selection
    userSelect: 'none',
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: 'none',
    padding: 2,
    background: "rgba(0,0,0,0.2)",
    borderRadius: SCROLLBAR_SIZE,
    transition: 'background 160ms ease-out',
    '&:hover': { background: "rgba(0,0,0,0.6)" },
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: SCROLLBAR_SIZE,
    },
  });
  
  export const ScrollThumb = styled(ScrollArea.Thumb, {
    flex: 1,
    background: "$gray800",
    borderRadius: SCROLLBAR_SIZE,
    // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: 44,
      minHeight: 44,
    },
  });