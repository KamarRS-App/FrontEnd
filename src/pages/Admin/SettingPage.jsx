import React, { useEffect, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/toast';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const SettingPage = () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    const id = Cookies.get('id');
    const toast = useToast();
    const navigate = useNavigate();

    const initialValues = {
        nama: '',
        email: '',
        peran: 'Admin',
        hospital_id: null,
    }

    const [initialValue, setInitialValue] = useState(initialValues);

    const schemaUpdate = Yup.object().shape({
        nama: Yup.string().required('Nama tidak boleh kosong'),
        email: Yup.string().email('Format Email salah').required('Email tidak boleh kosong'),
        hospital_id: Yup.number().required('Rumah Sakit Bekerja tidak boleh kosong'),
    })

    const { register: updateAdminFunc, handleSubmit: handleUpdateAdmin, setValue: setValueUpdate, formState: { errors: errorsUpdate } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schemaUpdate),
        defaultValues: initialValue,
    });

    const getAdminStaffByIdHandler = async () => {
        await api.getAdminById(token, id)
            .then(response => {
                const data = response.data.data;
                setValueUpdate('nama', data.nama)
                setValueUpdate('email', data.email)
                setValueUpdate('peran', data.peran)
                setValueUpdate('hospital_id', data.hospital_id)
                Cookies.set('name', data.nama)
            })
    }

    const updateAdminHandler = async(data) => {
        await api.updateAdmin(token, id, data)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onSubmit = (data) => {
        updateAdminHandler(data);
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
        getAdminStaffByIdHandler();
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
                    <form onSubmit={handleUpdateAdmin(onSubmit)}>
                        <FormControl isInvalid={errorsUpdate.nama}>
                            <FormLabel color={'#CDD1E0'}>Nama</FormLabel>
                            <Input type='text' id='name' borderColor={'#CDD1E0'} {...updateAdminFunc('nama')} />
                        </FormControl>

                        <FormControl mt={'4'} isInvalid={errorsUpdate.email}>
                            <FormLabel color={'#CDD1E0'}>Email</FormLabel>
                            <Input type='email' id='email' borderColor={'#CDD1E0'} {...updateAdminFunc('email')} />
                        </FormControl>
                        <Button
                            type='submit'
                            mt={10}
                            bg='#3AB8FF'
                            _hover={{ bg: '#1FA8F6' }}
                            color='white'
                            width={{ base: '36', sm: '56', md: '82', lg: '96' }}
                        >
                            Simpan
                        </Button>
                    </form>

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
                        _hover={{ bg: '#1FA8F6' }}
                        color='white'
                        width={{ base: '36', sm: '56', md: '82', lg: '96' }}
                    >
                        Simpan
                    </Button>
                </Box>
            </Stack>

        </LayoutAdmin>
    );
}

export default SettingPage;
