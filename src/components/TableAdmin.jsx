import { Box, Divider } from '@chakra-ui/layout';
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
                <Table variant={'unstyled'} overflow={'scroll'}>
                    <Thead
                        borderBottom={'1px'}
                        borderColor={'#E0E0E0'}
                        color={'#828282'}
                    >
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


export default TableAdmin;
