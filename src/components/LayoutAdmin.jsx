import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import SideBarAdmin from './SideBarAdmin';

const LayoutAdmin = ({children}) => {
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
                width={{ base:'90%',sm:'90%',md:'75%', lg:'75%' }}
                bg='#FAFAFA'
            >
                {children}

            </Box>
        </Flex>
    );
}

export default LayoutAdmin;
