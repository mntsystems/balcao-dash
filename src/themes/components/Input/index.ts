import { ComponentStyleConfig } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

export const Input: ComponentStyleConfig = {
    defaultProps: {
        variant: "filled",
        _hover: {
            bg: "gray.200",
        },
    },
    variants: {
        filled: (props) => ({
            ...theme.components.Input.variants?.outline(props),
            field: {
                bg: "white",
                border: "1px solid",
                borderColor: "teal.300",
                color: "teal.800",
                px: 2,
                fontFamily: "'Bai Jamjuree', sans-serif",
                _placeholder: {
                    opacity: 0.3,
                },
                height: "48px",
                _focus: {
                    borderColor: "teal.400",
                    background: "white",
                },
                _hover: {
                    background: "white",
                    border: "1px solid",
                },
            },
        }),
    },
};
