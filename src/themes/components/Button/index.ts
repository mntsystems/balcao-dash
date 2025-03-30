import { ComponentStyleConfig } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
    defaultProps: {
        defaultProps: {
            variant: "blue",
        },
    },
    variants: {
        blue: (props) => ({
            ...theme.components.Button.variants?.outline(props),
            fontWeight: 500,
            width: "100%",
            bg: "primary.100",
            color: "white",
            fontFamily: "'Roboto', sans-serif",
            _hover: {
                bg: "primary.200",
                _disabled: {
                    bg: "primary.200",
                },
            },
        }),
    },
};
