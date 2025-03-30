import React from "react";
import { Flex, Tooltip, Text, Box } from "@chakra-ui/react";
import { HomeStatistic } from "../../resources/interfaces";
import { formatters } from "../../resources/formatters";
import { observer } from "mobx-react";
import { IoHelpCircleOutline } from "react-icons/io5";

interface IProps {
    data: HomeStatistic | null;
}
const StatisctTableMobile: React.FC<IProps> = observer(({ data }) => {
    return (
        <Flex
            flexDirection="column"
            position="relative"
            fontFamily="'Bai Jamjuree', sans-serif"
        >
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
            <Flex flexDirection="column" w="100%" mx="auto">
                <Flex alignItems="center" bg="white" roundedTopEnd="xl">
                    <Flex bg="primary.100" roundedTopStart="xl" p={3} w={150}>
                        <Text color="white">Hoje</Text>
                    </Flex>
                    <Text mx="auto">
                        {formatters.currencyForBR(
                            data?.today.toString() || "0"
                        )}
                    </Text>
                </Flex>
                <Flex alignItems="center" my={1} bg="white">
                    <Flex bg="primary.100" p={3} w={150}>
                        <Text color="white">Últimos 15 dias</Text>
                    </Flex>
                    <Text mx="auto">
                        {formatters.currencyForBR(
                            data?.last15days.toString() || "0"
                        )}
                    </Text>
                </Flex>
                <Flex alignItems="center" bg="white">
                    <Flex bg="primary.100" p={3} w={150}>
                        <Text color="white">Últimos 30 dias</Text>
                    </Flex>
                    <Text mx="auto">
                        {formatters.currencyForBR(
                            data?.last30days.toString() || "0"
                        )}
                    </Text>
                </Flex>
                <Flex
                    alignItems="center"
                    mt={1}
                    bg="white"
                    roundedBottomEnd="xl"
                >
                    <Flex
                        bg="primary.100"
                        roundedBottomStart="xl"
                        p={3}
                        w={150}
                    >
                        <Text color="white">Total</Text>
                    </Flex>
                    <Text mx="auto">
                        {formatters.currencyForBR(
                            data?.total.toString() || "0"
                        )}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
});

export { StatisctTableMobile };
