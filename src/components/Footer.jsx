import { Box, Flex, Spacer, Stack, Text, Image, Link } from '@chakra-ui/react';
import React from 'react';
import {
    List,
    ListItem,
    UnorderedList,
} from '@chakra-ui/react'

const Footer = () => {
    return (
        <footer className='bg-[#d9f0fd]'>
            <Flex
                justify={['center', 'center', 'space-between']}
                direction={['column', 'column', 'row']}
                width="100%"
                py={{ base: '50px', md: '70px', lg: '80px' }}
                px={{ base: '20px', md: '50px', lg: '70px' }}
            >
                <Box>
                    <Stack
                        width={{ base: 'auto', md: '400px' }}
                        px={{ base:'20px', md:'0' }}
                    >
                        <Image
                            height='75px'
                            width='100px'
                            objectFit='contain'
                            src='/src/assets/images/logo_rawat_inap.svg'
                            alt='Logo Rawat Inap'
                        />
                        <Text
                            color='#072051'
                            fontSize='16px'
                            fontWeight='400'
                            lineHeight='30px'
                        >
                            Kami memberikan informasi kamar Rumah Sakit secara real-time bagi anda dan keluarga
                        </Text>
                    </Stack>
                </Box>
                <Box
                    flexBasis={{ base: "100%", md: "auto" }}
                    pt={{ base: '30px', md: '0', lg: '0' }}
                >

                    <Stack
                        direction={['column', 'column', 'row']}
                        justify={["center", "center", "flex-end"]}
                        gap='10'
                    >
                        <Box>
                            <UnorderedList listStyleType='none' color='#072051' fontSize='16px'>
                                <ListItem>
                                    <Text
                                        fontSize={{ base: '14px', md: '18px', lg: '18px' }}
                                        color='#1FA8F6'
                                        fontWeight='500'
                                    >
                                        Explore Us
                                    </Text>
                                </ListItem>
                                <ListItem pt='5'><Link>Register</Link></ListItem>
                                <ListItem pt='3'><Link>Privacy</Link></ListItem>
                                <ListItem pt='3'><Link>Terms & Conditions</Link></ListItem>
                            </UnorderedList>
                        </Box>
                        <Box>
                            <UnorderedList listStyleType='none' color='#072051' fontSize='16px'>
                                <ListItem>
                                    <Text
                                        fontSize={{ base: '14px', md: '18px', lg: '18px' }}
                                        color='#1FA8F6'
                                        fontWeight='500'
                                    >
                                        Connect Us
                                    </Text>
                                </ListItem>
                                <ListItem pt='5'>support@rawatinap.id</ListItem>
                                <ListItem pt='3'>021 - 2208 - 1996</ListItem>
                                <ListItem pt='3'>rawatinap Ahmad Yani, Surabaya</ListItem>
                            </UnorderedList>
                        </Box>
                    </Stack>
                </Box>
            </Flex>
        </footer>
    );
}

export default Footer;
