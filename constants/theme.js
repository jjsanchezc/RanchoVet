const COLORS = {
  primary: "#F7EDCF",//"#F4E3B2", vainilla
  secondary: "#EFC88B",//sunset
  tertiary: "#CF5C36",//flame
  fourth: "#F3DBAD",
  background: "#FBF4E1",//cosmic latte
  

  gray: "#D3D5D7",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",

  black: "#050517",
};

const FONT = {
  regular: "Poppins",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
