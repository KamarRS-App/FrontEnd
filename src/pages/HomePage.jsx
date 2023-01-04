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
import apiProvinsi from '../services/apiProvinsi';
import { Link } from 'react-router-dom';
import { AuthToken } from '../services/authToken';
import Loading from '../components/Loading';

const HomePage = () => {
    const token = Cookies.get('token');
    const toast = useToast();
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [provinsi, setProvinsi] = useState([]);
    const [selectProvinsi, setSelectProvinsi] = useState();
    const [nameProvinsi, setNameProvinsi] = useState('');
    const [kota, setKota] = useState([]);
    const [selectKota, setSelectKota] = useState('');
    const auth = AuthToken();
    const [loading, setLoading] = useState(true);

    const getAllHospitalsHandler = async () => {
        await api.getHospitals(token)
            .then(response => {
                const data = response.data.data;
                setHospitals(data);
            })
            .catch(error => {
                console.log(error);
            })
        setLoading(false)
    }

    const getProvinsi = async () => {
        await apiProvinsi.getProvinsi()
            .then((response) => {
                const data = response.data.provinsi
                setProvinsi(data);
            });
    };

    const getDetailProvinsi = async (id) => {
        await apiProvinsi.getDetailProvinsi(id)
            .then(response => {
                const data = response.data;
                setNameProvinsi(data.nama)
            })
            .catch(error => {
                setNameProvinsi('all')
            })
    }

    const getKotaKabupatenByProvinsi = async (id) => {
        await apiProvinsi.getKotaKabupateByProvinsi(id)
            .then(response => {
                const data = response.data.kota_kabupaten;
                setKota(data);
            })
    }

    const handlerChangeProvinsi = (e) => {
        setSelectKota('');
        getDetailProvinsi(e);
        getKotaKabupatenByProvinsi(e);
    }

    const resultHospital = hospitals.filter((data) => {
        return data.provinsi == nameProvinsi;
    })

    const resultRegionHospital = resultHospital.filter((data) => {
        return data.kabupaten_kota == selectKota;
    })

    useEffect(() => {
        if (!auth) {
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
        getProvinsi();
    }, []);

    return (
        <>
            {loading && <Loading body={'Tunggu Sebentar...'} />}
            {
                !loading &&
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
                            {
                                flowRegister.map(data => (
                                    <CardFlow
                                        key={data.no}
                                        desc={data.desc}
                                        number={data.no}
                                    />
                                ))
                            }
                        </Flex>
                    </Box>
                    <TableListHospital
                        provinsi={provinsi}
                        valueProvinsi={selectProvinsi}
                        onChangeProvinsi={(e) => handlerChangeProvinsi(e.target.value)}
                        kota={kota}
                        valueKota={selectKota}
                        onChangeKota={(e) => setSelectKota(e.target.value)}
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
                            (nameProvinsi === 'all' || nameProvinsi === '' ? hospitals : selectKota === 'all' || selectKota === '' ? resultHospital : resultRegionHospital)
                                .map((data, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Link>
                                            <Td
                                                textDecoration={'underline'}
                                                _hover={{ color: '#1FA8F6' }}
                                            >
                                                {data.nama}
                                            </Td>
                                        </Link>
                                        <Td>{data.pemilik_pengelola}</Td>
                                        <Td>{data.no_telpon}</Td>
                                        <Td>{data.alamat + " " + data.kecamatan + " " + data.kabupaten_kota + ", " + data.provinsi + "," + data.kode_pos}</Td>
                                    </Tr>
                                ))
                        }
                    />
                    <Box
                        textAlign={'center'}
                        mt={'10'}
                        mb={'20'}
                    >
                        <Button
                            onClick={() => navigate('/rumahsakit')}
                            bg={'#3AB8FF'}
                            color={'white'}
                            px={'10'}
                            py={'6'}
                            _hover={{ bg: 'alta.primary' }}
                        >
                            Telusuri Lebih Banyak
                        </Button>
                    </Box>
                </Layout>
            }
        </>
    );
}

const flowRegister = [
    {
        no: 1,
        desc: 'Registrasi pasien rawat inap melalui website',
    },
    {
        no: 2,
        desc: 'Memilih kamar rawat inap berdasarkan rumah sakit dan jenis kamar',
    },
    {
        no: 3,
        desc: 'Melakukan pembayaran pendaftaran pasien rawat inap',
    },
    {
        no: 4,
        desc: 'Mendapatkan email konfirmasi pasien rawat inap',
    },
    {
        no: 5,
        desc: 'Membawa pasien  terdaftar rawat inap ke rumah sakit yang dituju',
    },
]

export default HomePage;
