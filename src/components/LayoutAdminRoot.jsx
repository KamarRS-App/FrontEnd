import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import SideBarAdminRoot from './SideBarAdminRoot';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LayoutAdminRoot = ({activeMenu, children, name, role}) => {
    const navigate = useNavigate();
    const onLogoutHandler = () => {
        Cookies.remove('token');
        navigate('/root/login');
    }
    return (
        <Flex
            wrap='wrap'
        >
            <Box
                width='full'
            >
                <NavbarAdmin name={name} role={role} onLogout={onLogoutHandler} />
            </Box>
            <Box
                maxWidth='500px'
                width={{ base:'10%', md:'25%' }}
                borderRight='1px'
                borderColor='#CDD1E0'
                minHeight={'87vh'}
            >
                <SideBarAdminRoot active={activeMenu} />
            </Box>
            <Box
                width={{ base:'90%',sm:'90%',md:'75%', lg:'75%' }}
                bg='#FAFAFA'
                p={{ base:'5',sm:'8',md:'10' }}
            >
                {children}

            </Box>
        </Flex>
    );
}

export default LayoutAdminRoot;
