import React from "react";
import {
    Td,
    TableContainer,
    Table,
    Tr,
    Th,
    Thead,
    Tbody,
    Flex,
    Tooltip,
    Box,
    Text,
} from "@chakra-ui/react";
import { HomeStatistic } from "../../resources/interfaces";
import { formatters } from "../../resources/formatters";
import { observer } from "mobx-react";
import { IoHelpCircleOutline } from "react-icons/io5";

interface IProps {
    data: HomeStatistic | null;
}
const StatisticTable: React.FC<IProps> = observer(({ data }) => {
    const headers = ["Hoje", "Últimos 15 dias", "Últimos 30 dias", "Todos"];
    return (
        <Flex flexDirection="column" position="relative">
            <Flex justifyContent="space-between" px={3}>
                <Text
                    fontFamily="'Bai Jamjuree', sans-serif"
                    fontSize={20}
                    mb={5}
                    color="primary.100"
                    textAlign="right"
                >
                    Relatório de Faturamento
                </Text>
                <Tooltip
                    placement="top"
                    bg="primary.100"
                    fontFamily="'Bai Jamjuree', sans-serif"
                    label="Contabilizando apenas pedidos FINALIZADOS."
                >
                    <Box>
                        <IoHelpCircleOutline cursor="pointer" size={25} />
                    </Box>
                </Tooltip>
            </Flex>
            <TableContainer
                bg="white"
                boxShadow="xl"
                mb={10}
                mt={1}
                rounded="md"
            >
                <Table variant="striped">
                    <Thead bg="primary.100" pb={5} h={58} rounded="md">
                        <Tr>
                            {headers.map((item, index) => (
                                <Th
                                    textTransform="capitalize"
                                    fontFamily="'Bai Jamjuree', sans-serif"
                                    key={index + "k"}
                                    fontSize={18}
                                    color="white"
                                    fontWeight={600}
                                >
                                    {item}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && (
                            <Tr>
                                <Td
                                    fontWeight={600}
                                    fontFamily="'Bai Jamjuree', sans-serif"
                                >
                                    {formatters.currencyForBR(
                                        data.today.toString()
                                    )}
                                </Td>
                                <Td
                                    fontWeight={600}
                                    fontFamily="'Bai Jamjuree', sans-serif"
                                >
                                    {formatters.currencyForBR(
                                        data.last15days.toString()
                                    )}
                                </Td>
                                <Td
                                    fontWeight={600}
                                    fontFamily="'Bai Jamjuree', sans-serif"
                                >
                                    {formatters.currencyForBR(
                                        data.last30days.toString()
                                    )}
                                </Td>
                                <Td
                                    fontWeight={600}
                                    fontFamily="'Bai Jamjuree', sans-serif"
                                >
                                    {formatters.currencyForBR(
                                        data.total.toString()
                                    )}
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
});

export { StatisticTable };
