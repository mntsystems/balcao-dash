import React from "react";
import { Flex, Link, Text } from "@chakra-ui/react";
import { observer } from "mobx-react";

interface IProps {
    label: string;
    data?: string;
    isLink?: boolean;
}

const DetailsRow: React.FC<IProps> = observer(({ label, data, isLink }) => {
    return (
        <Flex
            flexDir="column"
            gap={2}
            w="100%"
            borderBottom="1px solid"
            borderColor="teal.200"
            p={2}
        >
            <Text
                fontSize={{ base: 16, md: 20 }}
                fontWeight="bold"
                fontFamily={"'Bai Jamjuree', sans-serif"}
            >
                {label}
            </Text>
            {isLink ? (
                <Link fontSize={{ base: 14, md: 18 }} href={data}>
                    {data}
                </Link>
            ) : (
                <Text fontSize={{ base: 14, md: 18 }}>{data}</Text>
            )}
        </Flex>
    );
});

export { DetailsRow };
