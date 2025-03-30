import React from "react";
import {
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Image,
    Input,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { IoFishOutline } from "react-icons/io5";

const loginSchema = z.object({
    email: z.string().email({ message: "Insira um endereço de e-mail válido" }),
    password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { login, isLoading } = useAuth();
    const router = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchema) => {
        login(data, () => router("/inicio"));
    };

    return (
        <Center h="100vh" bg="primary.800" p={2} flexDirection="column">
            <Flex
                flexDir="column"
                p={5}
                w={{ base: "95%", md: "60%", lg: 400 }}
                border="1px solid"
                borderColor="teal.200"
                bg="primary.400"
                gap={3}
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email:</FormLabel>
                        <Input
                            type="email"
                            placeholder="exemplo@exemplo.com"
                            {...register("email")}
                        />
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl mt={4} isInvalid={!!errors.password}>
                        <FormLabel>Senha:</FormLabel>
                        <Input
                            type="password"
                            placeholder="Digite uma senha"
                            {...register("password")}
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        type="submit"
                        variant="blue"
                        isLoading={isLoading}
                    >
                        Entrar
                    </Button>
                </form>
            </Flex>
            <Image
                src="/marca-mnt.png"
                w={150}
                alt="Logo"
                mx="auto"
                mb={10}
                mt={10}
            />
        </Center>
    );
};

export default Login;
