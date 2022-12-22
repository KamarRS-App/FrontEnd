import React from 'react';
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
    InputLeftAddon
} from '@chakra-ui/react';
import TableListHospital from '../components/TableListHospital';

const HomePage = () => {
    return (
        <Layout>
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
                    templateColumns='repeat(3, 1fr)'
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
            <TableListHospital />
        </Layout>
    );
}

export default HomePage;
