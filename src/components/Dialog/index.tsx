import React from "react";
import { observer } from "mobx-react-lite";

import {
    Button,
    ButtonProps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Text,
} from "@chakra-ui/react";

export interface DialogProps {
    isOpen: boolean;
    ref?: React.MutableRefObject<undefined>;
    title?: string;
    closeOnOverlayClick?: boolean;
    description?: string;
    onClose: () => void;
    buttons?: Array<{
        title: string;
        onPress: () => void;
        buttonProps?: ButtonProps;
        outlined?: boolean;
    }>;
}

export const Dialog: React.FC<DialogProps> = observer((props) => {
    const {
        onClose,
        isOpen,
        description,
        buttons,
        closeOnOverlayClick,
        title,
    } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={closeOnOverlayClick}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                {title && (
                    <Text
                        fontWeight="bold"
                        fontSize={30}
                        mx="auto"
                        mt={5}
                        color="primary.500"
                    >
                        {title}
                    </Text>
                )}
                <ModalBody
                    mx="auto"
                    textAlign="center"
                    color="secondary.500"
                    fontSize="md"
                    w="80%"
                    lineHeight={5}
                    py={10}
                >
                    {description}
                </ModalBody>

                <ModalFooter justifyContent="center" gap={6} pb={8}>
                    {buttons &&
                        buttons.map((button) =>
                            button.outlined ? (
                                <Button
                                    w="100%"
                                    variant="outline"
                                    textColor="black"
                                    colorScheme="primary"
                                    fontSize={{ base: "sm", sm: "md" }}
                                    key={button.title}
                                    onClick={button.onPress}
                                    {...button.buttonProps}
                                    py={8}
                                >
                                    {button.title}
                                </Button>
                            ) : (
                                <Button
                                    py={8}
                                    w="100%"
                                    textColor="white"
                                    key={button.title}
                                    fontSize={{ base: "sm", sm: "md" }}
                                    colorScheme="primary"
                                    onClick={button.onPress}
                                    {...button.buttonProps}
                                >
                                    {button.title}
                                </Button>
                            )
                        )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
