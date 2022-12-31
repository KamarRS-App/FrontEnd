import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import HeadAdminPoli from '../../components/HeadAdminPoli';
import LayoutAdmin from '../../components/LayoutAdmin';

const PoliclinicPages = () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    const toast = useToast();
    const navigate = useNavigate();

    const staff = useSelector((state) => state.staffs);

    console.log(staff)

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
        // getPoliclinicByHospital();
        // getDoctorsByPoliclinic();
    }, []);

    return (
        <LayoutAdmin activeMenu={'poli'}>
            <HeadAdminPoli />
        </LayoutAdmin>
    );
}

export default PoliclinicPages;
