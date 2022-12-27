import { Box, Button, Checkbox, Flex, FormControl, FormLabel, HStack, Image, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const LoginAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Stack
            minWidth={'full'}
            minHeight={'100vh'}
            maxHeight={'100vh'}
            bg={'#FAFAFA'}
            p={'10'}
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
                    px={'80px'}
                    py={'70px'}
                >
                    <Text
                        color={'#1FA8F6'}
                        fontSize={'36px'}
                        fontWeight={'600'}
                    >
                        Login as Admin
                    </Text>
                    <FormControl
                        mt={'8'}
                    >
                        <FormLabel
                            fontSize={'14px'}
                            color={'#695C5C'}
                        >
                            Email
                        </FormLabel>
                        <Input placeholder='email@mail.com' id="email" type='email' border={'1px'} borderColor={'#00000066'} height={'50px'} borderRadius={'xl'} _placeholder={{ color: '#000000B2' }} />
                        {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                    </FormControl>
                    <FormControl
                        mt={'5'}
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
                            <Input placeholder='password' id="password" type='password' border={'1px'} borderColor={'#00000066'} height={'50px'} borderRadius={'xl'} _placeholder={{ color: '#000000B2' }} />
                            <Box
                                position={'absolute'}
                                right={'4'}
                                bottom={'4'}
                                cursor={'pointer'}
                                onClick={() => setShowPassword(!showPassword)}

                            >
                                {showPassword ?  <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                            </Box>
                        </Stack>

                        {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
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
                </Box>

            </HStack>
        </Stack>
    );
}

export default LoginAdmin;
