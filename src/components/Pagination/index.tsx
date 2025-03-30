import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

export interface IProps {
    currentPage: number;
    prevPage: () => void;
    nextPage: () => void;
    hasNextPage: boolean;
}

export const Pagination: React.FC<IProps> = (props) => {
    const { currentPage, prevPage, nextPage, hasNextPage } = props;
    return (
        <Flex alignItems="center" justifyContent="center">
            <IconButton
                variant="icon"
                color="secondary.50"
                opacity={currentPage === 1 ? 0.4 : 1}
                cursor={currentPage === 1 ? "not-allowed" : "pointer"}
                isDisabled={currentPage === 1}
                aria-label="Left Icon"
                __css={{
                    fontSize: 18,
                }}
                icon={<FaArrowCircleLeft />}
                onClick={prevPage}
            />
            <Text mx={3} color="primary.100">
                {currentPage}
            </Text>
            <IconButton
                variant="icon"
                color="secondary.50"
                cursor={!hasNextPage ? "not-allowed" : "pointer"}
                opacity={!hasNextPage ? 0.4 : 1}
                isDisabled={!hasNextPage}
                __css={{
                    fontSize: 18,
                }}
                aria-label="Right Icon"
                icon={<FaArrowCircleRight />}
                onClick={nextPage}
            />
        </Flex>
    );
};
