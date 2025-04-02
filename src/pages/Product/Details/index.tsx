/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import {
    Button,
    Center,
    Flex,
    Grid,
    Heading,
    Image,
    Link,
    Tooltip,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import { DetailsRow } from "../../../components/DetailsRow";
import { formatters } from "../../../resources/formatters";
import ProductStore from "../../../stores/ProductStore";
const Details: React.FC = observer(() => {
    const { id } = useParams();
    const store = useLocalObservable(() => new ProductStore());
    const router = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.getProductById(id!);
        };
        fetchData();
    }, [store]);

    return (
        <Center minH="100vh" bg="primary.300" p={2} flexDirection="column">
            <Flex
                bg="white"
                boxShadow="md"
                flexDirection="column"
                p={5}
                gap={2}
                w={{ base: "95%", md: "60%", lg: "27%" }}
                border="1px solid"
                borderColor="teal.200"
            >
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
                <Heading textAlign="center" color="primary.100">
                    Detalhes do Produto
                </Heading>
                <Link href={store.product?.imagem_url || ""} target="_blank">
                    <Tooltip label="Ver em tamanho original.">
                        <Image
                            h={{ base: 150, md: 300 }}
                            w="100%"
                            objectFit="cover"
                            src={store.product?.imagem_url}
                            alt={store.product?.name}
                        />
                    </Tooltip>
                </Link>
                <Grid gridTemplateColumns="repeat(2,1fr)" gap={2}>
                    <DetailsRow label="Nome:" data={store.product?.name} />
                    <DetailsRow
                        label="Link:"
                        isLink
                        data={store.product?.link}
                    />
                    <DetailsRow label="Estado:" data={store.product?.state} />
                    <DetailsRow
                        label="Data:"
                        data={formatters.date(store.product?.date)}
                    />
                    <DetailsRow
                        label="Adicionada aos destaques?"
                        data={store.product?.highlight ? "Sim" : "Não"}
                    />
                    <DetailsRow
                        label="Carnaval?"
                        data={store.product?.carnaval ? "Sim" : "Não"}
                    />
                    <DetailsRow
                        label="Reveillon?"
                        data={store.product?.reveilon ? "Sim" : "Não"}
                    />
                    <DetailsRow
                        label="Cadastrado em:"
                        data={formatters.date(store.product?.createdAt)}
                    />
                </Grid>
            </Flex>
            <Button
                variant="outline"
                w="max-content"
                _hover={{
                    color: "primary.100",
                }}
                mt={5}
                border="none"
                onClick={() => router(-1)}
            >
                Voltar ao início
            </Button>
        </Center>
    );
});

export default Details;
