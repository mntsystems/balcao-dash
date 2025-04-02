import React from "react";
import { Center, Flex, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";

const Loading: React.FC = () => {
    const router = useNavigate();
    const { user } = useAuth();
    React.useEffect(() => {
        setTimeout(() => {
            if (user) return router("/inicio");
            router("/login");
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Center h="100vh" bg="primary.300" p={2} flexDirection="column">
            <Flex justifyContent="center">
                <Image
                    src="/logo.png"
                    w={250}
                    alt="Logo"
                    mx="auto"
                    mb={10}
                    mt={10}
                />
            </Flex>
            <Heading color="primary.100">Aguarde...</Heading>
        </Center>
    );
};

export default Loading;
