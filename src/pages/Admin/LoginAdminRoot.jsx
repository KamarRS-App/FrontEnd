import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../../assets/images/logo_rawat_inap.svg';

const LoginAdminRoot = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState('');
    const navigate = useNavigate();
    const toast = useToast();


    const initialValues = {
        email: '',
        kata_sandi: '',
    }

    const [initialValue, setInitialValue] = useState(initialValues);

    const schema = Yup.object().shape({
        email: Yup.string().email('Email tidak sesuai').required('Email wajib diisi'),
        kata_sandi: Yup.string().required('Password wajib diisi')
    })

    const { register: loginAdmin, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: initialValue,
    })

    const loginHandle = async (data) => {
        await api.loginSuperAdmin(data)
            .then(response => {
                const data = response.data.data;
                toast({
                    position: 'top',
                    title: 'Login Berhasil',
                    status: 'success',
                    duration: '1500',
                    isClosable: true
                })
                Cookies.set('token', data.token)
                Cookies.set('role', data.peran)
                navigate('/root/dashboard')
            })
            .catch(error => (
                toast({
                    position: 'top',
                    title: 'Login Gagal',
                    status: 'error',
                    duration: '1500',
                    isClosable: true
                })
            ))
    }

    const onSubmit = (data) => {
        loginHandle(data)

    }

    const onShowPassword = (e) => {
        setShow(e.target.value)
    }

    return (
        <Stack
            minWidth={'full'}
            minHeight={'100vh'}
            maxHeight={'100vh'}
            bg={'#FAFAFA'}
            p={{ base: '5', md: '10' }}
        >
            <Image
                height='auto'
                width='135px'
                objectFit='contain'
                src={logo}
                alt='Logo Rawat Inap'
                ml={'10'}
            />
            <HStack
                justify={'center'}
                alignItems='center'
            >
                <Box
                    maxWidth={'500px'}
                    maxHeight={'650px'}
                    bg={'white'}
                    border={'1px'}
                    borderRadius={'2xl'}
                    shadow={'lg'}
                    width={'full'}
                    height={'full'}
                    borderColor={'#E0E0E0'}
                    px={{ base: '10', md: '80px' }}
                    py={{ base: '10', md: '70px' }}
                >
                    <Text
                        color={'#1FA8F6'}
                        fontSize={{ base: '26px', md: '28px' }}
                        fontWeight={'600'}
                    >
                        Login as Super Admin
                    </Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            mt={'8'}
                            isInvalid={errors.email}
                        >
                            <FormLabel
                                fontSize={'14px'}
                                color={'#695C5C'}
                            >
                                Email
                            </FormLabel>
                            <Input
                                placeholder='email@mail.com'
                                id="email"
                                type='email'
                                border={'1px'}
                                borderColor={'#00000066'}
                                height={'50px'}
                                borderRadius={'xl'}
                                _placeholder={{ color: '#000000B2' }}
                                {...loginAdmin('email')}
                            />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl
                            mt={'5'}
                            isInvalid={errors.kata_sandi}
                        >
                            <FormLabel
                                fontSize={'14px'}
                                color={'#695C5C'}
                            >
                                Password
                            </FormLabel>
                            <Stack
                                position={'relative'}
                            >
                                <Input
                                    placeholder='password'
                                    id="kata_sandi"
                                    type={showPassword ? 'text' : 'password'}
                                    border={'1px'}
                                    borderColor={'#00000066'}
                                    height={'50px'}
                                    borderRadius={'xl'}
                                    _placeholder={{ color: '#000000B2' }}
                                    onInput={onShowPassword}
                                    {...loginAdmin('kata_sandi')}
                                />
                                {
                                    show &&
                                    <Box
                                        position={'absolute'}
                                        right={'4'}
                                        bottom={'4'}
                                        cursor={'pointer'}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {
                                            showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />
                                        }
                                    </Box>
                                }
                            </Stack>
                            {errors.kata_sandi && <FormErrorMessage>{errors.kata_sandi.message}</FormErrorMessage>}
                        </FormControl>
                        <Button
                            type='submit'
                            mt={'10'}
                            width={'full'}
                            bg={'#1FA8F6'}
                            color={'white'}
                            fontSize={'16px'}
                            fontWeight={'600'}
                            _hover={{ bg: '#3AB8FF' }}
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </HStack>

        </Stack >
    );
}

export default LoginAdminRoot;
