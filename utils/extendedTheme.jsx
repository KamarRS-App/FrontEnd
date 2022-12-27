import { defineStyle, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    alta: {
      primary: "#1FA8F6",
      secondary: "#9DD9FB",
    },
  },
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`
  }
});

export default theme;
