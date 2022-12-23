import { SearchIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { IoLogOutOutline } from 'react-icons/io5'
import React from 'react';
import { Button } from '@chakra-ui/button';

const NavbarAdmin = () => {
    return (
        <Flex
            alignItems='center'
            borderBottom='1px'
            borderColor='#CDD1E0'
            wrap='wrap'
            justify='space-between'
            px={'10'}
            bg='white'
            py='3'
            >
            <Box>
                <Image
                    height='75px'
                    width='100px'
                    objectFit='contain'
                    src='/src/assets/images/logo_rawat_inap.svg'
                    alt='Logo Rawat Inap'
                    />
            </Box>
            <Flex
                gap='10'
                alignItems='center'
            >
                <InputGroup
                    width={{ base: 'full', sm: '300px', md: '400px' }}
                    shadow='md'
                    borderRadius='md'
                    display={{ base:'none', lg:'flex' }}
                >
                    <Input
                        placeholder='Cari Rumah Sakit'
                        borderRight='none'
                    />
                    <InputRightAddon
                        children={<SearchIcon />}
                        borderLeft='none'
                        bg='transparent'
                    />
                </InputGroup>
                <Box
                    border='1px'
                    borderColor='#E0E0E0'
                    p={2}
                    borderRadius='md'
                    display={{ base:'none', sm:'block' }}
                >
                    <Text>
                        22 Desember 2022
                    </Text>
                </Box>
                <Box
                    display={{ base:'none', sm:'block' }}
                >
                    <Text>John Doe</Text>
                    <Text>Super Admin</Text>
                </Box>
                <Button
                    bg='transparent'
                    _hover={{ bg: 'transparent' }}
                >
                    <IoLogOutOutline className='text-3xl' />
                </Button>
            </Flex>
        </Flex>
    );
}

export default NavbarAdmin;
