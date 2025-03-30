import React from "react";
import { Input, Flex, Text, InputProps } from "@chakra-ui/react";

interface IProps extends InputProps {
    label?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    value?: string;
    maxLength?: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TextInput: React.FC<IProps> = ({
    label,
    placeholder,
    type,
    isReadOnly,
    isDisabled,
    value,
    maxLength,
    onChange,
    ...rest
}) => {
    return (
        <Flex flexDirection="column" gap={1}>
            <Text fontWeight={600} color="teal.800">
                {label}
            </Text>
            <Input
                {...rest}
                maxLength={maxLength}
                isReadOnly={isReadOnly}
                isDisabled={isDisabled}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
            />
        </Flex>
    );
};
