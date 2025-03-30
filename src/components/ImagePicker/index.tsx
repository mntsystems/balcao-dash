import React, { useState } from "react";
import {
    Input,
    IconButton,
    Box,
    Image,
    FormLabel,
    Tooltip,
    useToast,
    Spinner,
    Flex,
    Text,
} from "@chakra-ui/react";
import { FiUpload, FiTrash } from "react-icons/fi";
import axios from "axios";
import { observer } from "mobx-react";
import { formatters } from "../../resources/formatters";

interface IProps {
    pickImage: (e: string) => void;
    url?: string;
}
const ImagePicker: React.FC<IProps> = observer(({ pickImage, url }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleFileChange = async (e: any) => {
        setLoading(true);
        const file = e.target.files[0];
        const formdata = new FormData();
        formdata.append("file", file);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as any);
            };
            reader.readAsDataURL(file);
        }
        try {
            const requestUrl = await axios.post(
                `${
                    process.env.REACT_APP_API_URL
                        ? `${process.env.REACT_APP_API_URL}image/upload`
                        : "https://mero-api-iota.vercel.app/image/upload"
                }`,
                formdata,
                config
            );
            pickImage(requestUrl.data);
        } catch {
            toast({
                status: "error",
                title: "Erro ao importar imagem.",
                description: "Tente novamente mais tarde.",
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async () => {
        setLoading(true);
        console.log("IMAGE ID: ", formatters.getImageIdFromUrl(url || "ZERO"));
        try {
            if (url) {
                await axios.delete(
                    "http://localhost:3001/image/" +
                        formatters.getImageIdFromUrl(url)
                );
            }
            setImage(null);
            pickImage("");
        } catch {
            toast({
                status: "error",
                title: "Ops, aconteceu um erro.",
                description: "Tente novamente mais tarde.",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box>
            {url ?? image ? (
                <Box position="relative">
                    <FormLabel>Imagem Anexada:</FormLabel>
                    <Image
                        w="50%"
                        maxH={200}
                        src={(image as any) || url}
                        alt="Uploaded"
                        opacity={loading ? 0.4 : 1}
                    />
                    <Box position="absolute" top={10} right={"52%"}>
                        <Tooltip label="Clique para remover Imagem.">
                            <IconButton
                                _hover={{
                                    backgroundColor: "primary.100",
                                    color: "white",
                                }}
                                aria-label="Remove Image"
                                icon={<FiTrash />}
                                onClick={deleteImage}
                            />
                        </Tooltip>
                    </Box>
                </Box>
            ) : (
                <Box>
                    {loading ? (
                        <Flex
                            h={100}
                            flexDirection="column"
                            gap={1}
                            rounded="lg"
                        >
                            <Text>A imagem está carregando.</Text>
                            <Spinner />
                        </Flex>
                    ) : (
                        <>
                            <Input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                display="none"
                            />
                            <FormLabel>Anexar imagem:</FormLabel>
                            <label htmlFor="file-upload">
                                <Tooltip label="Clique para anexar imagem.">
                                    <IconButton
                                        _hover={{
                                            backgroundColor: "primary.100",
                                            color: "white",
                                        }}
                                        cursor="pointer"
                                        as="span"
                                        aria-label="Upload Image"
                                        icon={<FiUpload />}
                                    />
                                </Tooltip>
                            </label>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
});

export default ImagePicker;
