import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';

const Dashboard = () => {
    return (
        <Flex
            wrap='wrap'
        >
            <Box
                width='full'
            >
                <NavbarAdmin />
            </Box>
            <Box
                maxWidth='500px'
                width='20%'
                minHeight='screens'
            >
                <SideBarAdmin />
            </Box>
            <Box
                width='80%'
                bg='white'
                borderLeft='1px'
            >

            </Box>
        </Flex>
    );
}

export default Dashboard;
