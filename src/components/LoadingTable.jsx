import { Box, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

const LoadingTable = () => {
    return (
        <Box>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
            <Text>Memuat Data....</Text>
        </Box>
    );
}

export default LoadingTable;
