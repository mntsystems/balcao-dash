import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Flex,
    Heading,
    BoxProps,
    Box,
    Spinner,
    TableContainer,
} from "@chakra-ui/react";
import { Pagination } from "../Pagination";

interface IProps<DataType> extends BoxProps {
    data: DataType[];
    headers: string[];
    renderRow: (item: DataType, index: number) => React.ReactElement | null;
    loading: boolean;
    emptyMessage: string;
    currentPage: number;
    prevPage: () => void;
    nextPage: () => void;
    hasNextPage: boolean;
    tableTitle?: string;
    headerFilter?: JSX.Element;
    isCard?: boolean;
    headerColor?: string;
    exportCsv?: {
        onClick: () => void;
        isLoading?: boolean;
    };
}

export const GenericTable = <DataType,>(props: IProps<DataType>) => {
    const {
        data,
        headers,
        renderRow,
        loading,
        emptyMessage,
        currentPage,
        hasNextPage,
        prevPage,
        nextPage,
    } = props;

    return (
        <Flex w="100%" flexDir="column" alignItems="center" mb={5}>
            <TableContainer
                borderRadius="8px"
                h={500}
                w="100%"
                overflowY="auto"
                boxShadow="md"
                bg="white"
                position="relative"
            >
                <Box maxHeight={{ base: 450, md: 600 }} overflowX="auto">
                    {loading || !data ? (
                        <Flex my={5} w="100%" justifyContent="center">
                            <Spinner />
                        </Flex>
                    ) : data.length < 1 ? (
                        <Flex
                            my={5}
                            w="100%"
                            justifyContent="center"
                            minH={300}
                            alignItems="center"
                        >
                            <Heading
                                size="md"
                                fontWeight="bold"
                                color="primary.100"
                            >
                                {emptyMessage}
                            </Heading>
                        </Flex>
                    ) : (
                        <Table variant="striped">
                            <Thead bg="primary.100" py={5} h={58}>
                                <Tr
                                    py={{ base: 2, md: 5 }}
                                    h={{ base: 30, md: 58 }}
                                >
                                    {headers.map((item, index) => (
                                        <Th
                                            borderRight={
                                                item === "Agendado em:"
                                                    ? "1px solid white"
                                                    : "none"
                                            }
                                            borderBottom="1px solid #2B60D73D"
                                            textTransform="capitalize"
                                            fontFamily="'Bai Jamjuree', sans-serif"
                                            key={index + "k"}
                                            fontSize={{
                                                base: 14,
                                                md: 18,
                                            }}
                                            color="white"
                                            fontWeight={600}
                                        >
                                            {item}
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody color="black" fontWeight={600}>
                                {data.map((dataItem, index) =>
                                    renderRow(dataItem, index)
                                )}
                            </Tbody>
                        </Table>
                    )}
                </Box>
            </TableContainer>
            <Flex mt={5}>
                <Pagination
                    currentPage={currentPage}
                    hasNextPage={hasNextPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </Flex>
        </Flex>
    );
};
