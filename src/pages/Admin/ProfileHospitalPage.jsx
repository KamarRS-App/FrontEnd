import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import LayoutAdmin from '../../components/LayoutAdmin';
import Loading from '../../components/Loading';
import api from '../../services/api';
import { AuthToken } from '../../services/authToken';

function ProfileHospitalPage() {
  const [hospital, setHospital] = useState([]);
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  const toast = useToast();
  const navigate = useNavigate();
  const auth = AuthToken();
  const staff = useSelector((state) => state.staffs);
  const hospital_id = staff.hospital_id;
  const [loading, setLoading] = useState(true);

  const getHospitalById = async () => {
    await api
      .getHospitalByID(token, hospital_id)
      .then((response) => {
        setHospital(response.data.data);
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Gagal mendapatkan Data Rumah Sakit',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    if (role !== 'Admin - Staff' || !auth) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true,
      });
      navigate('/admin/login');
    }
    getHospitalById();
  }, []);

  return (
    <>
      {loading && <Loading body={'Halaman Sedang Dimuat...'} />}
      {!loading && (
        <LayoutAdmin activeMenu={'hospital'}>
          <Stack>
            <Flex
              alignItems={'center'}
              justify={{ sm: 'space-between' }}
              gap={'3'}
              px={{ base: '8', sm: '8', md: '8', lg: '10' }}
              bg="white"
              py={{ base: '5', sm: '5', md: '10' }}
              borderBottom="4px"
              borderColor="#FAFAFA"
              textAlign={{ base: 'center', sm: 'left' }}
              wrap={'wrap'}
            >
              <Box>
                <Text fontSize={'20px'} fontWeight={'600'} color={'#1FA8F6'}>
                  Profil Rumah Sakit
                </Text>
              </Box>
            </Flex>
            <Stack bg={'white'} px={{ base: '5', sm: '5', md: '10' }} py={{ base: '5', sm: '10', md: '16', lg: '20' }}>
              <Box p={'5'} border={'1px'} borderColor={'#E5E5E5'} width={{ base: '250px', sm: '350px', md: '500px', lg: '600px' }} borderRadius={'xl'}>
                <Image src={hospital.foto} borderRadius={'xl'} />
              </Box>
              <Box maxWidth={'500px'}>
                <Text mt={'4'} fontWeight={'700'} color={'#072051'} fontSize={{ base: '14px', sm: '16px', md: '20px' }}>
                  {hospital.nama}
                </Text>
                <Text mt={'4'} fontSize={{ base: '12px', sm: '14px', md: '18px' }} color={'#B0B0B0'}>
                  {hospital.alamat + ', ' + hospital.kecamatan + ', ' + hospital.kabupaten_kota + ', ' + hospital.provinsi + ', ' + hospital.kode_pos}
                </Text>
                <Text mt={'4'} fontWeight={'700'} color={'#072051'} fontSize={{ base: '14px', sm: '16px', md: '20px' }}>
                  Kontak:
                </Text>
                <Text mt={'4'} fontSize={{ base: '12px', sm: '14px', md: '18px' }} color={'#B0B0B0'}>
                  {hospital.no_telpon}
                </Text>
                <Text mt={'4'} fontWeight={'700'} color={'#072051'} fontSize={{ base: '14px', sm: '16px', md: '20px' }}>
                  Jam Buka:
                </Text>
                <Text mt={'4'} fontSize={{ base: '12px', sm: '14px', md: '18px' }} color={'#B0B0B0'}>
                  Buka 24 Jam
                </Text>
              </Box>
            </Stack>
          </Stack>
        </LayoutAdmin>
      )}
    </>
  );
}

export default ProfileHospitalPage;
