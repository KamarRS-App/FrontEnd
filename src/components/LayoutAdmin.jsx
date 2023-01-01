import { Box, Flex } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { destroyStaffs } from '../features/adminSlice';
import NavbarAdmin from './NavbarAdmin';
import SideBarAdmin from './SideBarAdmin';

const LayoutAdmin = ({children, activeMenu}) => {
    const name = Cookies.get('name');
    const role = Cookies.get('role');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogoutHandler = () => {
        dispatch(destroyStaffs())
        navigate('/admin/login');
    }

    return (
        <Flex
            wrap='wrap'
        >
            <Box
                width='full'
            >
                <NavbarAdmin name={name} onLogout={() => onLogoutHandler()} role={role} />
            </Box>
            <Box
                maxWidth='500px'
                width={{ base:'10%', md:'25%' }}
                borderRight='1px'
                borderColor='#CDD1E0'
                minHeight={'87vh'}
            >
                <SideBarAdmin active={activeMenu} />
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

export default LayoutAdmin;
