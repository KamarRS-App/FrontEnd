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
                width={{ base:'10%', md:'25%' }}
                borderRight='1px'
                borderColor='#CDD1E0'
                minHeight='87vh'
            >
                <SideBarAdmin />
            </Box>
            <Box
                width={{ base:'90%',md:'80%' }}
                bg='white'
            >

            </Box>
        </Flex>
    );
}

export default Dashboard;
