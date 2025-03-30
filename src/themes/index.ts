/* eslint-disable prettier/prettier */
import { extendTheme } from "@chakra-ui/react";
import { components } from "./components";
import { colors } from "./colors";

export const theme = extendTheme({
  components,
  colors,
  styles: {
    global: {
      "::-webkit-scrollbar": {
        width: "15px",
        backgroundColor: "#EFEFEF",
      },
      "::-webkit-scrollbar-thumb": {
        width: "15px",
        backgroundColor: "teal.400",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "green",
        width: "15px",
      },
    },
  },
});
