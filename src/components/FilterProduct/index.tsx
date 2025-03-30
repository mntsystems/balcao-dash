import React from "react";
import { Flex, Text, Input } from "@chakra-ui/react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

const FilterScheduler: React.FC = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    setDefaultLocale("pt-BR");
    return (
        <Flex
            p={5}
            gap={10}
            alignItems="center"
            border="1px solid"
            w="max-content"
            borderColor="primary.300"
            bg="white"
            rounded="md"
            boxShadow="md"
        >
            <Flex flexDirection="column">
                <Text fontFamily="'Bai Jamjuree', sans-serif">
                    Data de Entrada:
                </Text>
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
                    selected={selectedDate}
                    onChange={(date: Date) => {
                        setSelectedDate(date);
                    }}
                />
            </Flex>
            <Flex flexDirection="column">
                <Text fontFamily="'Bai Jamjuree', sans-serif">
                    Data de Saída:
                </Text>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    customInput={<Input isReadOnly cursor="pointer" />}
                    selected={selectedDate}
                    onChange={(date: Date) => {
                        setSelectedDate(date);
                    }}
                />
            </Flex>
        </Flex>
    );
};

export { FilterScheduler };
