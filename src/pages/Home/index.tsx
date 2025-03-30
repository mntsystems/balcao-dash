import React from "react";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { DrawerMenu } from "../../components/DrawerMenu";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAuth } from "../../auth";
import { IoFishOutline } from "react-icons/io5";
import { observer } from "mobx-react";

const Home: React.FC = observer(() => {
    const { user } = useAuth();

    return (
        <Flex h="100vh" w="100%" bg="primary.300">
            <Center
                h="100vh"
                w="100%"
                bgGradient="url('/wave.svg')"
                bgPosition="bottom"
                bgRepeat="no-repeat"
                p={2}
                flexDirection="column"
            >
                <Heading color="primary.100">Bem vindo,</Heading>
                <Heading textTransform="capitalize" color="primary.100">
                    {user?.userName}
                </Heading>
                <DrawerMenu>
                    <Button variant="blue" mt={10}>
                        Abrir Menu
                        <IoIosArrowRoundForward size={25} />
                    </Button>
                </DrawerMenu>
            </Center>
        </Flex>
    );
});

export default Home;
