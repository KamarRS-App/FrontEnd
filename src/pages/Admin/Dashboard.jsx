import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import CardAdmin from '../../components/CardAdmin';
import ChartPatient from '../../components/ChartPatient';
import { dataPatient } from '../../../utils/Data';
import LayoutAdmin from '../../components/LayoutAdmin';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useToast } from '@chakra-ui/toast';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    const toast = useToast();
    const navigate = useNavigate();
    const staffs = useSelector((state) => state.staffs);

    useEffect(() => {
        if (role !== 'Admin - Staff' && token === undefined) {
            toast({
                position: 'top',
                title: 'Kamu Harus Login Dulu',
                status: 'warning',
                duration: '2000',
                isClosable: true
            })
            navigate('/admin/login');
        }
    }, []);
    return (
        <LayoutAdmin activeMenu={'dashboard'}>
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
        </LayoutAdmin>
    );
}

export default Dashboard;
