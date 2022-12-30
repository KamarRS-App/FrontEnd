import React, { useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { Button } from '@chakra-ui/button';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/toast';
import { useNavigate } from 'react-router';

const SettingPage = () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    const toast = useToast();
    const navigate = useNavigate();

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
        <LayoutAdmin activeMenu={'profile'}>
            <Stack
                mt={'8'}
            >
                <Box
                    bg='white'
                    p={{ base: '2', sm: '5', md: '10' }}
                    borderBottom='4px'
                    borderColor='#FAFAFA'
                    textAlign={{ base: 'center', sm: 'left' }}
                >
                    <Text
                        fontSize={'20px'}
                        fontWeight={'600'}
                        color={'#1FA8F6'}
                    >
                        Profil
                    </Text>
                </Box>
                <Box
                    bg={'white'}
                    px={{ base: '5', sm: '5', md: '10' }}
                    py={{ base: '10', sm: '5', md: '10' }}
                >
                    <FormControl>
                        <FormLabel color={'#CDD1E0'}>Nama</FormLabel>
                        <Input type='text' id='name' borderColor={'#CDD1E0'} />
                    </FormControl>

                    <FormControl mt={'4'}>
                        <FormLabel color={'#CDD1E0'}>Email</FormLabel>
                        <Input type='email' id='email' borderColor={'#CDD1E0'} />
                    </FormControl>

                    <FormControl mt={'4'}>
                        <FormLabel color={'#CDD1E0'}>Handphone</FormLabel>
                        <Input type='text' id='handphone' borderColor={'#CDD1E0'} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel color={'#CDD1E0'}>Role</FormLabel>
                        <Select placeholder='Pilih Role' id='role' borderColor={'#CDD1E0'}>
                            <option>Admin</option>
                            <option>Super Admin</option>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>

            <Stack
                mt={'10'}
                mb={'8'}
            >
                <Box
                    bg='white'
                    p={{ base: '2', sm: '5', md: '10' }}
                    borderBottom='4px'
                    borderColor='#FAFAFA'
                    textAlign={{ base: 'center', sm: 'left' }}
                >
                    <Text
                        fontSize={'20px'}
                        fontWeight={'600'}
                        color={'#1FA8F6'}
                    >
                        Atur Password
                    </Text>
                </Box>
                <Box
                    bg={'white'}
                    px={{ base: '5', sm: '5', md: '10' }}
                    py={{ base: '10', sm: '5', md: '10' }}
                >
                    <FormControl>
                        <FormLabel color={'#CDD1E0'}>Password Lama</FormLabel>
                        <Input type='password' id='oldPassword' borderColor={'#CDD1E0'} />
                    </FormControl>

                    <FormControl mt={'4'}>
                        <FormLabel color={'#CDD1E0'}>Password Baru</FormLabel>
                        <Input type='password' id='newPassword' borderColor={'#CDD1E0'} />
                    </FormControl>
                    <Button
                        type='submit'
                        mt={10}
                        bg='#3AB8FF'
                        _hover={{ bg:'#1FA8F6' }}
                        color='white'
                        width={{ base:'36',sm:'56',md:'82',lg:'96' }}
                    >
                        Simpan
                    </Button>
                </Box>
            </Stack>

        </LayoutAdmin>
    );
}

export default SettingPage;
