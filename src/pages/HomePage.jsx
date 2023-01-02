import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import HeroComponent from '../components/HeroComponent';
import CardFlow from '../components/CardFlow';
import {
    Box,
    Text,
    Flex,
    Select,
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    useToast,
    Tr,
    Th,
    Td
} from '@chakra-ui/react';
import TableListHospital from '../components/TableListHospital';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import api from '../services/api';

const HomePage = () => {
    const token = Cookies.get('token');
    const toast = useToast();
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);

    const getAllHospitalsHandler = async () => {
        await api.getHospitals(token)
            .then(response => {
                const data = response.data.data;
                setHospitals(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (!token) {
            toast({
                position: 'top',
                title: 'Kamu Harus Login Dulu',
                status: 'warning',
                duration: '2000',
                isClosable: true
            });
            navigate('/login');
        }
        getAllHospitalsHandler();
    }, []);

    return (
        <Layout isActive={'home'}>
            <HeroComponent />
            <Box
                px={['20']}
                my={['20']}
            >
                <Text
                    fontWeight='600'
                    fontSize={['30px', '48px']}
                    mb={['10']}
                    color='#1FA8F6'
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    Alur Pendaftaran
                </Text>
                <Flex
                    gridTemplateColumns={'repeat(3, 1fr)'}
                    rowGap='20'
                    columnGap='10'
                    flexWrap='wrap'
                    justifyContent='center'
                >
                    <CardFlow
                        desc='Registrasi pasien rawat inap melalui website'
                        number='1'
                    />
                    <CardFlow
                        desc='Memilih kamar rawat inap berdasarkan rumah sakit dan jenis kamar'
                        number='2'
                    />
                    <CardFlow
                        desc='Melakukan pembayaran pendaftaran pasien rawat inap'
                        number='3'
                    />
                    <CardFlow
                        desc='Mendapatkan email konfirmasi pasien rawat inap'
                        number='4'
                    />
                    <CardFlow
                        desc='Membawa pasien  terdaftar rawat inap ke rumah sakit yang dituju'
                        number='5'
                    />
                </Flex>
            </Box>
            <TableListHospital
                headTable={
                    <Tr>
                        <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                            No
                        </Th>
                        <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                            Nama Rumah Sakit
                        </Th>
                        <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                            Pemilik / Pengelola
                        </Th>
                        <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                            No Telepon
                        </Th>
                        <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                            Alamat
                        </Th>
                    </Tr>
                }
                bodyTable={
                    hospitals.map((data, index) => (
                        <Tr>
                            <Td>{index + 1}</Td>
                            <Td>{data.nama}</Td>
                            <Td>{data.pemilik_pengelola}</Td>
                            <Td>{data.no_telpon}</Td>
                            <Td>{data.alamat + " " + data.kecamatan + " " + data.kabupaten_kota + ", " + data.provinsi + "," + data.kode_pos}</Td>
                        </Tr>
                    ))
                }
            />
            <Button>
                Telusuri Lebih Banyak
            </Button>
        </Layout>
    );
}

export default HomePage;
