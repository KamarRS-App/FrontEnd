import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Flex, Img, Spacer, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router';
import Cookies from 'js-cookie';
import api from '../services/api';
import Loading from '../components/Loading';

function DetailCariRumahSakit() {
  const { id } = useParams();
  const token = Cookies.get('token');
  const [hospital, setHospital] = useState();
  const [beds, setBeds] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bedCheck, setBedCheck] = useState(false);

  const getDetailHospital = async () => {
    await api
      .getHospitalByID(token, id)
      .then((response) => {
        const data = response.data.data;
        setHospital(data);
      })
      .catch((error) => { });
    setLoading(false);
  };

  const getAllBedByHospital = async () => {
    await api
      .getAllBeds(token, id)
      .then((response) => {
        const data = response.data.data;
        data.map(data => (
          checkBeds(data.status)
        ))
      })
      .catch((error) => { });
  };

  const handlerRegister = () => {
    navigate('/registrasi/pasien', {
      state: {
        hospital_id: id,
      },
    });
  };

  const checkBeds = (bed) => {
    if (bed == 'tersedia') {
      setBedCheck(true);
    }
  }
  console.log(bedCheck)

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
    getDetailHospital();
    getAllBedByHospital();
  }, []);

  return (
    <>
      {loading && <Loading body={'Tunggu Sebentar'} />}
      {!loading && (
        <Layout>
          <Box minW="100%" minH="100vh" h="100%">
            <Box px={{ base: '10', sm: '12', md: '16', lg: '24', xl: '36' }} pt="10" pb="36" minH="100vh" h="100%">
              <Box w="100%">
                <Flex direction={{ base: 'column', md: 'column', lg: 'row' }}>
                  <Box h="fit" rounded="20px" borderWidth="2px" flexBasis="1/2">
                    <Image src={hospital?.foto} width={'100%'} objectFit={'cover'} rounded="20px" p="10px" />
                  </Box>
                  <Box ml={{ base: '60px', lg: '40px', md: '20px' }} my="auto" h="100%" w="100%" mx="0" flexBasis="1/2">
                    <Flex flexDirection={'column'} gap={'3'} mt={{ base: 5, md: 10, lg: '0' }}>
                      <Text fontWeight="bold">{hospital?.nama}</Text>
                      <Text color="gray">{hospital?.alamat + ', ' + hospital?.kecamatan + ', ' + hospital?.kabupaten_kota + ', ' + hospital?.provinsi + ', ' + hospital?.kode_pos}</Text>
                      <Text fontWeight="bold">Kontak</Text>
                      <Text color="gray">{hospital?.no_telpon}</Text>
                      <Text fontWeight="bold">Jam Buka:</Text>
                      <Text color="gray">Open 24 hours</Text>
                      <Text fontWeight="bold">Status Kamar:</Text>
                      <Text fontWeight={'bold'} color={bedCheck ? '#4FC208' : '#FA0A0A'}>{bedCheck ? 'Tersedia' : 'Tidak Tersedia'}</Text>
                      <Button
                        mt={'2'}
                        bg={!bedCheck ? 'transparent' : `#3AB8FF`}
                        _hover={{ bg: 'alta.primary' }}
                        color={!bedCheck ? '#15192080' : 'white'}
                        borderWidth="2px"
                        disabled={bedCheck ? false : true}
                        border={0}
                        fontStyle={'600'}
                        onClick={() => handlerRegister()}
                      >
                        Daftar
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Layout>
      )}
    </>
  );
}

export default DetailCariRumahSakit;
