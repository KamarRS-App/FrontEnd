import { SearchIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { IoLogOutOutline } from 'react-icons/io5'
import React from 'react';
import { Button } from '@chakra-ui/button';
import moment from 'moment';
import logo from '/src/assets/images/logo_rawat_inap.svg';

const NavbarAdmin = ({name, role, onLogout}) => {
    const dateTime = new Date()
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
                    src={logo}
                    alt='Logo Rawat Inap'
                    />
            </Box>
            <Flex
                gap='10'
                alignItems='center'
            >
                <Box
                    border='1px'
                    borderColor='#E0E0E0'
                    p={2}
                    borderRadius='md'
                    display={{ base:'none', sm:'block' }}
                >
                    <Text>
                        {moment(dateTime).format('ll')}
                    </Text>
                </Box>
                <Box
                    display={{ base:'none', sm:'block' }}
                >
                    <Text>{name}</Text>
                    <Text>{role}</Text>
                </Box>
                <Button
                    bg='transparent'
                    _hover={{ bg: 'transparent' }}
                    onClick={onLogout}
                >
                    <IoLogOutOutline className='text-3xl' />
                </Button>
            </Flex>
        </Flex>
    );
}

export default NavbarAdmin;
