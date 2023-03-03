import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  margin: "0 auto",
  height: "calc(100vh - 7.5rem)", // 100vh - header height

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
    marginTop: "3rem",
  },

  ">img": {
    marginBottom: "6.5rem",
  },

  p: {
    fontSize: "$md",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
    fontWeight: 400,

    strong: {
      fontWeight: 700,
    },
  },

  a: {
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    marginTop: "5rem",
    fontWeight: 700,

    "&:hover": {
      color: "$green300",
      transition: "color 0.5s",
    },
  },
});

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%",
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ItemDisplayBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 140,
  marginLeft: 40,

  "& > div": {
    marginLeft: "-40px",
  },

  span:{
    marginRight: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "$xl",
    color: "$gray300",
    background: "$gray800",
    width: 60,
    height: 60,
    textAlign: "center",

    borderRadius: "50%"
  }
});
