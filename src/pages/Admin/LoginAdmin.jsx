import { Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState('');

    const initialValues = {
        email: '',
        password: '',
    }

    const [initialValue, setInitialValue] = useState(initialValues);

    const schema = Yup.object().shape({
        email: Yup.string().email('Email tidak sesuai').required('Email wajib diisi'),
        password: Yup.string().required('Password wajib diisi').min(8, 'Password minimal 8 karakter')
    })

    const { register: loginAdmin, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: initialValue,
    })

    const onError = (error) => {
        console.log(error)
    }

    const onSubmit = (values) => {
        console.log(values)
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
                src='/src/assets/images/logo_rawat_inap.svg'
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
                        fontSize={{ base: '26px', md: '36px' }}
                        fontWeight={'600'}
                    >
                        Login as Admin
                    </Text>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                            isInvalid={errors.password}
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
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    border={'1px'}
                                    borderColor={'#00000066'}
                                    height={'50px'}
                                    borderRadius={'xl'}
                                    _placeholder={{ color: '#000000B2' }}
                                    onInput={onShowPassword}
                                    {...loginAdmin('password')}
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
                                {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                            </Stack>
                        </FormControl>
                        <Flex
                            mt={'8'}
                            justify={'space-between'}
                        >
                            <Checkbox
                                colorScheme={'linkedin'}
                                size='lg'

                            >
                                <Text
                                    fontWeight={'600'}
                                    fontSize={'15px'}
                                >
                                    Remember Me
                                </Text>
                            </Checkbox>
                            <Text
                                color={'#E86969'}
                                fontWeight={'500'}
                                fontSize={'15px'}
                            >
                                lupa password
                            </Text>
                        </Flex>
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

export default LoginAdmin;
