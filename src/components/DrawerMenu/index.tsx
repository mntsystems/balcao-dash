import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Link,
    Text,
    Box,
    Flex,
    Accordion,
    AccordionPanel,
    AccordionButton,
    AccordionItem,
    Tooltip,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { MdAddBox } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { checkIfIsAdmin } from "../../resources/authorization";

interface IProps {
    children: React.ReactNode;
}

const DrawerMenu: React.FC<IProps> = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logout } = useAuth();
    const router = useNavigate();

    return (
        <>
            <Box onClick={onOpen}>{children}</Box>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent
                    color="white"
                    bg="primary.100"
                    fontFamily="'Bai Jamjuree', sans-serif"
                >
                    <DrawerCloseButton />
                    <DrawerHeader color="white" fontSize={36}>
                        Machê - Menu
                    </DrawerHeader>
                    <DrawerBody flexDirection="column">
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem border="none" mb={5}>
                                <Tooltip label="Clique para expandir ou recolher">
                                    <AccordionButton
                                        rounded="lg"
                                        _expanded={{
                                            bg: "primary.200",
                                            color: "white",
                                        }}
                                    >
                                        <AiOutlineProduct size={25} />
                                        <Text
                                            ml={4}
                                            cursor="pointer"
                                            fontSize={24}
                                            color="white"
                                        >
                                            Gerenciar Produtos
                                        </Text>
                                    </AccordionButton>
                                </Tooltip>
                                <AccordionPanel>
                                    <Flex
                                        fontSize={18}
                                        alignItems="center"
                                        mb={5}
                                        gap={1}
                                        onClick={() => router("/produtos")}
                                    >
                                        <GiNotebook />
                                        <Link>Listar Produtos</Link>
                                    </Flex>
                                    <Flex
                                        fontSize={18}
                                        alignItems="center"
                                        gap={1}
                                        onClick={() => router("/produto/criar")}
                                    >
                                        <MdAddBox />
                                        <Link>Cadastrar um novo Produto</Link>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                            {checkIfIsAdmin() && (
                                <AccordionItem border="none">
                                    <Tooltip label="Clique para expandir ou recolher">
                                        <AccordionButton
                                            rounded="lg"
                                            _expanded={{
                                                bg: "primary.200",
                                                color: "white",
                                            }}
                                        >
                                            <FaRegUser size={25} />
                                            <Text
                                                ml={4}
                                                cursor="pointer"
                                                fontSize={24}
                                                color="white"
                                            >
                                                Gerenciar Usuários
                                            </Text>
                                        </AccordionButton>
                                    </Tooltip>
                                    <AccordionPanel>
                                        <Flex
                                            fontSize={18}
                                            alignItems="center"
                                            mb={5}
                                            gap={1}
                                            onClick={() => router("/usuario")}
                                        >
                                            <GiNotebook />
                                            <Link>Listar Usuários</Link>
                                        </Flex>
                                        <Flex
                                            fontSize={18}
                                            alignItems="center"
                                            gap={1}
                                            onClick={() =>
                                                router("/usuario/criar")
                                            }
                                        >
                                            <MdAddBox />
                                            <Link>Cadastrar Usuário</Link>
                                        </Flex>
                                    </AccordionPanel>
                                </AccordionItem>
                            )}
                        </Accordion>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            colorScheme="primary.100"
                            onClick={logout}
                            color="white"
                        >
                            Sair da Conta
                        </Button>
                        <Button
                            colorScheme="primary.100"
                            onClick={onClose}
                            color="white"
                        >
                            Fechar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export { DrawerMenu };
