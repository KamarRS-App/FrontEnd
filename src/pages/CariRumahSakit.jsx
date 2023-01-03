import React, { useEffect, useState } from 'react';
import { Center, Container, Td, Th, Tr, useToast } from '@chakra-ui/react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import api from '../services/api';
import { useNavigate } from 'react-router';
import TableListHospital from '../components/TableListHospital';
import apiProvinsi from '../services/apiProvinsi';
import { Link } from 'react-router-dom';

function CariRumahSakit() {
  const token = Cookies.get('token');
  const toast = useToast();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [selectProvinsi, setSelectProvinsi] = useState();
  const [nameProvinsi, setNameProvinsi] = useState('');
  const [kota, setKota] = useState([]);
  const [selectKota, setSelectKota] = useState('');

  const getAllHospitalsHandler = async () => {
    await api
      .getHospitals(token)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProvinsi = async () => {
    await apiProvinsi.getProvinsi().then((response) => {
      const data = response.data.provinsi;
      setProvinsi(data);
    });
  };

  const getDetailProvinsi = async (id) => {
    await apiProvinsi
      .getDetailProvinsi(id)
      .then((response) => {
        const data = response.data;
        setNameProvinsi(data.nama);
      })
      .catch((error) => {
        setNameProvinsi('all');
      });
  };

  const getKotaKabupatenByProvinsi = async (id) => {
    await apiProvinsi.getKotaKabupateByProvinsi(id).then((response) => {
      const data = response.data.kota_kabupaten;
      setKota(data);
    });
  };

  const handlerChangeProvinsi = (e) => {
    setSelectKota('');
    getDetailProvinsi(e);
    getKotaKabupatenByProvinsi(e);
  };

  const resultHospital = hospitals.filter((data) => {
    return data.provinsi == nameProvinsi;
  });

  const resultRegionHospital = resultHospital.filter((data) => {
    return data.kabupaten_kota == selectKota;
  });

  useEffect(() => {
    if (!token) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true,
      });
      navigate('/login');
    }
    getProvinsi();
    getAllHospitalsHandler();
  }, []);
  return (
    <Layout isActive={'hospital'}>
      <Box>
        <Flex direction={['column-reverse', 'column-reverse', 'row']} alignItems="center" justify="center">
          <Center>
            <Box color="#1FA8F6" w={['300px', '350px', '500px']} h={['200px', '400px', '400px']} mt={50}>
              <Heading fontWeight={600} fontSize={['30px', '42px']} mr={10}>
                Find Room,
              </Heading>
              <Heading fontWeight={600} fontSize={['30px', '42px']}>
                Save Life
              </Heading>
              <Box w={['200px', '350px', '400px']}>
                <Text fontWeight={400} fontSize={['12px', '18px']} color="#000000" pt={5}>
                  Kami menyediakan pelayanan spesialis terbaik bagi anda dan keluarga
                </Text>
              </Box>
            </Box>
          </Center>

          <Box>
            <Flex direction="row" gap="2" wrap="wrap" mt={['50px', '100px', '20px']}>
              <Image w={['90px', '150px', '200px']} objectFit="cover" src="/src/assets/images/rs-mitra-keluarga.png" alt="rs-mitra-keluarga" fallbackSrc="https://via.placeholder.com/150" />
              <Image w={['90px', '150px', '200px']} objectFit="cover" src="/src/assets/images/rs-haji.png" alt="rs-haji-surabaya" fallbackSrc="https://via.placeholder.com/150" />
              <Image w={['90px', '150px', '200px']} src="/src/assets/images/rs-sardjito.png" alt="rs-sardjito" fallbackSrc="https://via.placeholder.com/150" />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box my={20}>
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
          bodyTable={(nameProvinsi === 'all' || nameProvinsi === '' ? hospitals : selectKota === 'all' || selectKota === '' ? resultHospital : resultRegionHospital).map((data, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Link to={`/rumahsakit/${data.id}/detail`}>
                <Td textDecoration={'underline'} _hover={{ color: '#1FA8F6' }}>
                  {data.nama}
                </Td>
              </Link>
              <Td>{data.pemilik_pengelola}</Td>
              <Td>{data.no_telpon}</Td>
              <Td>{data.alamat + ' ' + data.kecamatan + ' ' + data.kabupaten_kota + ', ' + data.provinsi + ',' + data.kode_pos}</Td>
            </Tr>
          ))}
        />
      </Box>
    </Layout>
  );
}

export default CariRumahSakit;
