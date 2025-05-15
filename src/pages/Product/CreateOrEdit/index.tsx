/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import {
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Image,
    useToast,
    Select,
    Stack,
    Switch,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer, useLocalObservable } from "mobx-react";
import { Controller, useForm } from "react-hook-form";
import ProductStore from "../../../stores/ProductStore";
import ImagePicker from "../../../components/ImagePicker";
import { States } from "../../../resources/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const productSchema = z.object({
    name: z.string().min(1, { message: "É necessário preencher este campo." }),
    link: z.string().min(1, { message: "É necessário preencher este campo." }),
    state: z.string(),
    imagem_url: z.string().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;

const CreateOrEdit: React.FC = observer(() => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
    });
    const store = useLocalObservable(() => new ProductStore());
    const router = useNavigate();
    const toast = useToast();
    const onSubmit = (data: ProductSchema) => {
        if (store.productImageUrl === "") {
            toast({
                status: "error",
                title: "Houve um erro.",
                description: "Você precisa anexar uma imagem ao produto",
            });
            return;
        }
        store.createOrEditProduct(data, () => router("/produtos/"), id);
    };
    React.useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const request = await store.getProductById(id);
                if (request) {
                    setValue("name", request.name);
                    setValue("link", request.link);
                    setValue("state", request.state);
                    store.productImageUrl = request.imagem_url;
                    store.highlight = request.highlight;
                    store.reveilon = request.reveilon;
                    store.carnaval = request.carnaval;
                    store.saojoao = request.saojoao;
                    store.teatro = request.teatro;
                    store.highlight = request.highlight;
                    store.date = new Date(request.date);
                }
            };
            fetchData();
        }
    }, [store, setValue]);

    return (
        <Center minH={"100vh"} bg="primary.300" p={2} flexDirection="column">
            <Flex
                bg="white"
                boxShadow="md"
                flexDirection="column"
                p={5}
                gap={5}
                w={{ base: "95%", md: "60%", lg: "30%" }}
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
                <Heading textAlign="center" color="primary">
                    {id ? "Editar Produto" : "Cadastrar Produto"}
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap={4} direction="column">
                        <ImagePicker
                            pickImage={(url) => (store.productImageUrl = url)}
                            url={store.productImageUrl}
                        />
                        <Flex gap={4}>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Nome:</FormLabel>
                                <Input
                                    placeholder="Insira o nome do produto"
                                    {...register("name")}
                                />
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <FormControl isInvalid={!!errors.link}>
                            <FormLabel>Insira o link:</FormLabel>
                            <Controller
                                control={control}
                                name="link"
                                render={({ field }) => (
                                    <Input
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />
                            <FormErrorMessage>
                                {errors.link?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Insira a data:</FormLabel>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                customInput={
                                    <Input
                                        isReadOnly
                                        cursor="pointer"
                                        placeholder="10/02/2024"
                                    />
                                }
                                selected={store.date}
                                onChange={(date: Date) => {
                                    store.date = date;
                                }}
                            />
                        </FormControl>
                        <FormControl isInvalid={!!errors.state}>
                            <FormLabel>Qual estado?</FormLabel>
                            <Controller
                                control={control}
                                name="state"
                                render={({ field }) => (
                                    <Select
                                        placeholder="Selecione um estado"
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value as States
                                            )
                                        }
                                        value={field.value}
                                    >
                                        {Object.entries(States).map(
                                            ([abbr, name]) => (
                                                <option key={abbr} value={abbr}>
                                                    {name}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                )}
                            />
                            <FormErrorMessage>
                                {errors.state?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Stack>
                            <FormLabel>Destaques?</FormLabel>
                            <Switch
                                isChecked={store.highlight}
                                onChange={() =>
                                    (store.highlight = !store.highlight)
                                }
                            />
                            <FormLabel>Carnaval?</FormLabel>
                            <Switch
                                isChecked={store.carnaval}
                                onChange={() =>
                                    (store.carnaval = !store.carnaval)
                                }
                            />
                            <FormLabel>reveillon?</FormLabel>
                            <Switch
                                isChecked={store.reveilon}
                                onChange={() =>
                                    (store.reveilon = !store.reveilon)
                                }
                            />
                            <FormLabel>São João?</FormLabel>
                            <Switch
                                isChecked={store.saojoao}
                                onChange={() =>
                                    (store.saojoao = !store.saojoao)
                                }
                            />
                            <FormLabel>Teatro?</FormLabel>
                            <Switch
                                isChecked={store.teatro}
                                onChange={() => (store.teatro = !store.teatro)}
                            />
                        </Stack>
                    </Flex>
                    <Button
                        _disabled={{ opacity: 0.4 }}
                        variant="blue"
                        mt={5}
                        type="submit"
                    >
                        {id ? "Editar" : "Cadastrar"}
                    </Button>
                </form>
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
                Voltar
            </Button>
        </Center>
    );
});

export default CreateOrEdit;
