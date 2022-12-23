import { Box } from '@chakra-ui/layout';
import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const TableAdmin = ({ headTable, bodyTable }) => {
    return (
        <Box
            bg='white'
            my={'10'}
        >
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        {headTable}
                    </Thead>
                    <Tbody>
                        {bodyTable}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const TableWrap = ({ children }) => {
    return (
        <TableContainer>
            <Table variant='simple'>
                {children}
            </Table>
        </TableContainer>
    );
}

export default TableAdmin;
