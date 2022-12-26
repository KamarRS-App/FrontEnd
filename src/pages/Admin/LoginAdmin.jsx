import { Box, Button, FormControl, FormLabel, HStack, Image, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const LoginAdmin = () => {
    return (
        <Stack
            minWidth={'full'}
            minHeight={'100vh'}
            bg={'#FAFAFA'}
        >
            <Image
                height='75px'
                width='100px'
                objectFit='contain'
                src='/src/assets/images/logo_rawat_inap.svg'
                alt='Logo Rawat Inap'
            />
            <HStack
                justify={'center'}
                alignItems='center'
            >
                <Box
                    maxWidth={'600px'}
                    maxHeight={'650px'}
                    bg={'white'}
                    border={'1px'}
                    width={'full'}
                    height={'full'}
                    borderColor={'#E0E0E0'}
                    px={'120px'}
                    py={'120px'}
                >
                    <Text
                        color={'#1FA8F6'}
                        fontSize={'36px'}
                        fontWeight={'600'}
                    >
                        Login Rawat Inap
                    </Text>
                    <FormControl
                        mt={'5'}
                    >
                        <FormLabel
                            fontSize={'14px'}
                            color={'#695C5C'}
                        >
                            Email
                        </FormLabel>
                        <Input placeholder='email@mail.com' id="email" type='email' border={'1px'} borderColor={'#00000066'} height={'50px'} borderRadius={'xl'} _placeholder={{ color:'#000000B2' }} />
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
                        <Input placeholder='password' id="password" type='password' border={'1px'} borderColor={'#00000066'} height={'50px'} borderRadius={'xl'} _placeholder={{ color:'#000000B2' }} />
                        {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                    </FormControl>
                    <Button
                        mt={'5'}
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
