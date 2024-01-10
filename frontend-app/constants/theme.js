import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
export const COLORS = {
  primary: "#018ae0",
  primaryTint: "#1a96e3",
  primaryShade: "#016eb3",
  secondary: "#e12d5a",
  secondaryTint: "#e4426b",
  secondaryShade: "#cb2951",
  black: "#212529",
  grey: "#495057",
  greyTint: " #868e96",
  greyShade: "#343a40",
  green: "#54cd38",
  orange: "#ff9933",
  purple: "#940c69",
  yellow: "#fae053",
  red: "#e32121",
  white: "#f2f2f2",
};

export const SIZES = {
  // Global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 8,
  padding2: 12,
  padding3: 16,

  // FONTS Sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // App Dimensions
  width,
  height,
};

export default appTheme;
