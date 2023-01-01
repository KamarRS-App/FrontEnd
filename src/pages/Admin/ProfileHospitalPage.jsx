import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutAdmin from '../../components/LayoutAdmin';
import api from '../../services/api';

function ProfileHospitalPage() {
  const [hospital, setHospital] = useState([]);
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  const toast = useToast();
  const navigate = useNavigate();

  const getHospitalById = async () => {
    await api.getHospitalByID(token, id)
      .then(response => {
        console.log(response.data.data)
        setHospital(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

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
            <Image src="/src/assets/images/profil_1.jpg" borderRadius={'xl'} />
          </Box>
          <Box maxWidth={'500px'}>
            <Text fontWeight={'700'} color={'#072051'} fontSize={{ base: '18px', sm: '20px', md: '24px' }}>
              RS Haji Surabaya
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px', md: '20px' }} color={'#B0B0B0'}>
              Jalan Manyar Kertoadi No 13, Klampisngasem, Kec. Sukolilo, Kota Surabaya, Jawa Timur 60116
            </Text>
            <Text fontWeight={'700'} color={'#072051'} fontSize={{ base: '18px', sm: '20px', md: '24px' }}>
              Kontak:
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px', md: '20px' }} color={'#B0B0B0'}>
              031592000
            </Text>
            <Text fontWeight={'700'} color={'#072051'} fontSize={{ base: '18px', sm: '20px', md: '24px' }}>
              Jam Buka:
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px', md: '20px' }} color={'#B0B0B0'}>
              Buka 24 Jam
            </Text>
          </Box>
        </Stack>
      </Stack>
    </LayoutAdmin>
  );
}

export default ProfileHospitalPage;
