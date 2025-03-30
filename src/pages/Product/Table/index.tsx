import React from "react";
import {
    Center,
    Button,
    Flex,
    Text,
    Tr,
    Td,
    Image,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import { useGlobalStore } from "../../../context";
import ProductStore from "../../../stores/ProductStore";
import { useDebounce } from "@uidotdev/usehooks";
import { DrawerMenu } from "../../../components/DrawerMenu";
import { IoMenuSharp } from "react-icons/io5";
import { formatters } from "../../../resources/formatters";
import { AiOutlineFileSearch } from "react-icons/ai";
import { LuPen } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { GenericTable } from "../../../components/GenericTable";

const TableView: React.FC = observer(() => {
    const router = useNavigate();
    const store = useLocalObservable(() => new ProductStore());
    const { dialog } = useGlobalStore();
    const debouncedSearchTerm = useDebounce(store.search, 1000);
    const onGoToEdit = (id: string) => {
        router(`/produto/editar/${id}`);
    };
    const onGoToDetails = (id: string) => {
        router(`/produto/detalhes/${id}`);
    };

    const openDialog = (id: string) => {
        dialog.showDialog({
            title: "Apagar Produto",
            closeOnOverlayClick: true,
            description:
                "Tem certeza que deseja apagar? Esta ação não poderá ser desfeita.",
            buttons: [
                {
                    title: "Confirmar",
                    onPress: () => {
                        store.deleteProduct(id, () => store.getProducts());
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
        store.getProducts();
    }, [store.lowestPrice, debouncedSearchTerm, store.page]);

    const headers = ["Nome", "Destaques", "Link", "Data", "Criado em:", ""];

    return (
        <Center minH="100vh" bg="primary.300" p={2} flexDirection="column">
            <DrawerMenu>
                <Button
                    variant="blue"
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
                mt={5}
                gap={5}
                flexDirection="column"
                w={{ base: "100%", md: "80%", lg: "70%" }}
                mx="auto"
            >
                <Flex
                    justifyContent="space-between"
                    flexDirection={{ base: "column", md: "row" }}
                    w="100%"
                >
                    <Text
                        fontFamily="'Bai Jamjuree', sans-serif"
                        fontSize={24}
                        color="primary.100"
                        mb={{ base: 4, md: 0 }}
                    >
                        Todos os produtos
                    </Text>
                </Flex>

                <FormControl w="max-content">
                    <FormLabel htmlFor="finishedAppointments" mb="0">
                        Nome do produto
                    </FormLabel>
                    <Input
                        w={300}
                        value={store.search || ""}
                        onChange={(e) => (store.search = e.target.value)}
                    />
                </FormControl>
                <GenericTable
                    headers={headers}
                    data={store.productList}
                    loading={store.loader}
                    nextPage={() => store.handlePage(false)}
                    hasNextPage={store.productList.length > 0}
                    prevPage={() => store.handlePage(true)}
                    currentPage={store.page}
                    emptyMessage={"Não há registros."}
                    renderRow={(item, index) => (
                        <Tr key={index.toString() + item.link}>
                            <Td>{item.name}</Td>
                            <Td>{item.highlight ? "Sim" : "Não"}</Td>
                            <Td>
                                <a href={item.link}>
                                    {formatters.cutLongStrings(item.link)}
                                </a>
                            </Td>
                            <Td>{formatters.date(item.date)}</Td>
                            <Td>{formatters.date(item.createdAt)}</Td>
                            <Td>
                                <Flex gap={4} alignItems="center">
                                    <AiOutlineFileSearch
                                        size={17}
                                        cursor="pointer"
                                        onClick={() => onGoToDetails(item.id)}
                                    />
                                    <LuPen
                                        size={15}
                                        cursor="pointer"
                                        onClick={() => onGoToEdit(item.id)}
                                    />
                                    <MdOutlineDelete
                                        onClick={() => openDialog(item.id)}
                                        size={20}
                                        cursor="pointer"
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
                    fontSize={{ base: 14, md: 18 }}
                    boxShadow="md"
                    onClick={() => router("/produto/criar")}
                >
                    Cadastrar um novo Produto
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
