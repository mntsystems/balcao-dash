import React from "react";
import { Center, Flex, Heading, Image, keyframes } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { IoFishOutline } from "react-icons/io5";

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
            <Flex>
                <IoFishOutline color="#40132e" size={50} />
            </Flex>
            <Heading color="primary.100">Aguarde...</Heading>
        </Center>
    );
};

export default Loading;
