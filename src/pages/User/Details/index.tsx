/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { Button, Center, Flex, Grid, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import { DetailsRow } from "../../../components/DetailsRow";
import { formatters } from "../../../resources/formatters";
import { IoFishOutline } from "react-icons/io5";
import UserStore from "../../../stores/UserStore";

const Details: React.FC = observer(() => {
    const { id } = useParams();
    const store = useLocalObservable(() => new UserStore());
    const router = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.getUserById(id!);
        };
        fetchData();
    }, [store]);

    return (
        <Center minH={"100vh"} bg="primary.300" p={2} flexDirection="column">
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
                    <IoFishOutline color="#40132e" size={50} />
                </Flex>
                <Heading textAlign="center" color="primary.100">
                    Detalhes do Usuário
                </Heading>
                <Grid gridTemplateColumns="repeat(2,1fr)" gap={2}>
                    <DetailsRow label="Nome" data={store.user?.name} />
                    <DetailsRow label="Email:" data={store.user?.email} />
                    <DetailsRow
                        label="Criado em:"
                        data={formatters.date(store.user?.createdAt)}
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
