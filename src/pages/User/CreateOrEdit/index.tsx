/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer, useLocalObservable } from "mobx-react";
import { useForm } from "react-hook-form";
import { IoFishOutline, IoHelpCircleOutline } from "react-icons/io5";
import UserStore from "../../../stores/UserStore";
import { Role } from "../../../resources/interfaces";
import { formatters } from "../../../resources/formatters";

const userSchema = z.object({
    nome: z.string().min(1, { message: "É necessário preencher este campo." }),
    email: z.string().min(1, { message: "É necessário preencher este campo." }),
    roles: z.nativeEnum(Role, {
        errorMap: () => {
            return { message: "Este campo é obrigatório" };
        },
    }),
    password: z
        .string()
        .min(1, { message: "É necessário preencher este campo." }),
    confirmPassword: z
        .string()
        .min(1, { message: "É necessário preencher este campo." }),
});

export type userSchema = z.infer<typeof userSchema>;

const CreateOrEdit: React.FC = observer(() => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<userSchema>({
        resolver: zodResolver(userSchema),
    });
    const store = useLocalObservable(() => new UserStore());
    const router = useNavigate();
    const toast = useToast();
    const onSubmit = (data: userSchema) => {
        if (!id) {
            if (data.confirmPassword !== data.password) {
                toast({
                    status: "error",
                    title: "Houve um erro.",
                    description: "As senhas não coincidem.",
                });
                return;
            }
        }

        store.createOrEditUser(data, () => router(-1), id);
    };
    React.useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const request = await store.getUserById(id);
                if (request) {
                    setValue("nome", request.name);
                    setValue("email", request.email);
                    setValue("roles", request.roles[0]);
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
                    <IoFishOutline color="#40132e" size={75} />
                </Flex>
                <Heading textAlign="center" color="primary">
                    {id ? "Editar Usuário" : "Cadastrar Usuário"}
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap={4} direction="column">
                        <Flex gap={4}>
                            <FormControl isInvalid={!!errors.nome}>
                                <FormLabel>Nome:</FormLabel>
                                <Input
                                    placeholder="Insira o nome do usuário"
                                    {...register("nome")}
                                />
                                <FormErrorMessage>
                                    {errors.nome?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel>Email:</FormLabel>
                                <Input
                                    placeholder="exemplo@exemplo.com"
                                    {...register("email")}
                                />
                                <FormErrorMessage>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Flex position="relative">
                            <FormControl isInvalid={!!errors.roles}>
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <FormLabel>
                                        Selecione o tipo de usuário:
                                    </FormLabel>
                                    <Tooltip
                                        placement="top"
                                        bg="primary.100"
                                        fontFamily="'Bai Jamjuree', sans-serif"
                                        label="Níveis de acesso, sendo Administrador o acesso máximo da plataforma. Funcionário não pode ver faturamento e nem controlar usuários. Técnico terá acesso total, cargo criado apenas para diferenciar dos demais. Usuário é um cargo comum, não terão acesso a este Dashboard."
                                    >
                                        <Box>
                                            <IoHelpCircleOutline
                                                cursor="pointer"
                                                size={25}
                                            />
                                        </Box>
                                    </Tooltip>
                                </Flex>
                                <Select
                                    placeholder="Selecione o cargo"
                                    {...register("roles")}
                                >
                                    {Object.values(Role).map((role) => (
                                        <option key={role} value={role}>
                                            {formatters.translateRoleEnum([
                                                role,
                                            ])}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.roles?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>
                        {!id && (
                            <Flex gap={4}>
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel>Senha:</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Insira uma senha"
                                        {...register("password")}
                                    />
                                    <FormErrorMessage>
                                        {errors.password?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors.confirmPassword}
                                >
                                    <FormLabel>Confirmar senha:</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Confirme a senha"
                                        {...register("confirmPassword")}
                                    />
                                    <FormErrorMessage>
                                        {errors.confirmPassword?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Flex>
                        )}
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
