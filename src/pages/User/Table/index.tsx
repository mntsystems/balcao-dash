import React from "react";
import {
    Center,
    Button,
    Flex,
    useDisclosure,
    Collapse,
    Text,
    FormControl,
    FormLabel,
    Input,
    Tr,
    Td,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { observer, useLocalObservable } from "mobx-react";
import { useGlobalStore } from "../../../context";
import { MdCleaningServices, MdOutlineDelete } from "react-icons/md";
import { useDebounce } from "@uidotdev/usehooks";
import UserStore from "../../../stores/UserStore";
import { GenericTable } from "../../../components/GenericTable";
import { formatters } from "../../../resources/formatters";
import { LuPen } from "react-icons/lu";
import { AiOutlineFileSearch } from "react-icons/ai";
import { DrawerMenu } from "../../../components/DrawerMenu";
import { IoMenuSharp } from "react-icons/io5";

const TableView: React.FC = observer(() => {
    const router = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const store = useLocalObservable(() => new UserStore());
    const { dialog } = useGlobalStore();
    const debouncedSearchTerm = useDebounce(store.search, 1000);

    const onGoToEdit = (id: string) => {
        router(`/usuario/editar/${id}`);
    };
    const onGoToDetails = (id: string) => {
        router(`/usuario/detalhes/${id}`);
    };

    const openDialog = (id: string) => {
        dialog.showDialog({
            title: "Apagar Usuário",
            closeOnOverlayClick: true,
            description:
                "Tem certeza que deseja apagar? Esta ação não poderá ser desfeita.",
            buttons: [
                {
                    title: "Confirmar",
                    onPress: () => {
                        store.deleteUser(id, () => store.getUsers());
                        dialog.closeDialog();
                    },
                    buttonProps: {
                        bg: "red.500",
                        height: "64px",
                        _hover: {
                            opacity: 0.8,
                        },
                    },
                },
                {
                    title: "Cancelar",
                    onPress: () => dialog.closeDialog(),
                    outlined: true,
                    buttonProps: {
                        color: "black",
                        rounded: "md",
                        height: "64px",
                        border: "2px solid",
                        borderColor: "black",
                        _hover: {
                            bg: "primary.300",
                        },
                    },
                },
            ],
        });
    };

    React.useEffect(() => {
        store.getUsers();
    }, [debouncedSearchTerm, store.page]);

    const clearFilters = () => {
        store.search = "";
    };

    return (
        <Center minH="100vh" bg="primary.300" p={2} flexDirection="column">
            <DrawerMenu>
                <Button
                    bg="primary.100"
                    position="absolute"
                    top={10}
                    left={0}
                    roundedTopStart={0}
                    roundedBottomStart={0}
                    w={150}
                >
                    <IoMenuSharp color="white" size={30} />
                </Button>
            </DrawerMenu>
            <Flex
                mt={28}
                gap={5}
                flexDirection="column"
                w={{ base: "100%", md: "80%", lg: "70%" }}
                mx="auto"
            >
                <Flex
                    justifyContent="space-between"
                    flexDir={{ base: "column-reverse", md: "row" }}
                    w="100%"
                    alignItems="cnter"
                >
                    <Flex gap={2}>
                        <Button
                            onClick={onToggle}
                            variant="blue"
                            w="max-content"
                        >
                            <Text color="white" mr={2}>
                                Filtrar
                            </Text>
                            <IoIosSearch size={25} />
                        </Button>
                        <Button
                            variant="blue"
                            w="max-content"
                            onClick={clearFilters}
                        >
                            <Text color="white" mr={2} cursor="pointer">
                                Limpar Filtros
                            </Text>
                            <MdCleaningServices />
                        </Button>
                    </Flex>
                    <Text
                        fontFamily="'Bai Jamjuree', sans-serif"
                        fontSize={24}
                        mb={{ base: 5, md: 0 }}
                        color="primary.100"
                    >
                        Todos os Usuários
                    </Text>
                </Flex>

                <Collapse in={isOpen} animateOpacity>
                    {/* <FilterScheduler /> */}
                    <form>
                        <Flex alignItems="center" justifyContent="left" gap={4}>
                            <FormControl w="max-content">
                                <FormLabel
                                    htmlFor="finishedAppointments"
                                    mb="0"
                                >
                                    Nome do Usuário
                                </FormLabel>
                                <Input
                                    w={300}
                                    placeholder="Faça sua pesquisa"
                                    value={store.search || ""}
                                    onChange={(e) =>
                                        (store.search = e.target.value)
                                    }
                                />
                            </FormControl>
                        </Flex>
                    </form>
                </Collapse>
                <GenericTable
                    headers={store.headers}
                    data={store.userList}
                    loading={store.loader}
                    nextPage={() => store.handlePage(false)}
                    hasNextPage={store.hasNextPage}
                    prevPage={() => store.handlePage(true)}
                    currentPage={store.page}
                    emptyMessage={"Não há registros."}
                    renderRow={(item, index) => (
                        <Tr key={index.toString() + item.name}>
                            <Td>{item.name}</Td>
                            <Td>{item.email}</Td>
                            <Td>{formatters.translateRoleEnum(item.roles)}</Td>
                            <Td>{formatters.date(item.createdAt)}</Td>
                            <Td>
                                <Flex gap={2} alignItems="center">
                                    <MdOutlineDelete
                                        onClick={() => openDialog(item.id)}
                                        size={20}
                                        cursor="pointer"
                                    />
                                    <LuPen
                                        size={15}
                                        cursor="pointer"
                                        onClick={() => onGoToEdit(item.id)}
                                    />
                                    <AiOutlineFileSearch
                                        size={17}
                                        cursor="pointer"
                                        onClick={() => onGoToDetails(item.id)}
                                    />
                                </Flex>
                            </Td>
                        </Tr>
                    )}
                />
                <Button
                    mx="auto"
                    variant="blue"
                    w="max-content"
                    boxShadow="md"
                    onClick={() => router("/usuario/criar")}
                >
                    Cadastrar um novo usuário
                </Button>
                <Button
                    mx="auto"
                    variant="outline"
                    w="max-content"
                    _hover={{
                        color: "primary.100",
                    }}
                    border="none"
                    onClick={() => router("/inicio")}
                >
                    Voltar ao início
                </Button>
            </Flex>
        </Center>
    );
});

export default TableView;
