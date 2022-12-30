import { Box, Flex } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataPatient } from '../../../utils/Data';
import CardAdmin from '../../components/CardAdmin';
import ChartPatient from '../../components/ChartPatient';
import LayoutAdminRoot from '../../components/LayoutAdminRoot';

const DashboardRoot = () => {
    const role = Cookies.get('role');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
            if(role !== 'super admin' && token === undefined) {
                toast({
                    position: 'top',
                    title: 'Kamu Harus Login Dulu',
                    status: 'warning',
                    duration: '2000',
                    isClosable: true
                })
                navigate('/root/login');
            }
    }, []);
    return (
        <LayoutAdminRoot activeMenu={'dashboard'} name={'Team Rawat Inap'} role={'Super Admin'}>
            <Flex
                gap='10'
                justify='space-between'
                wrap='wrap'
            >
                <CardAdmin />
                <CardAdmin />
                <CardAdmin />
                <CardAdmin />
                <Box
                    width='100%'
                    bg='white'
                    p='10'
                >
                    <ChartPatient chartData={dataPatient} />
                </Box>
            </Flex>
        </LayoutAdminRoot>
    );
}

export default DashboardRoot;
