import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const HeroComponent = () => {
    return (
        <>
            <Flex
                direction={['column-reverse', 'column-reverse', 'row']}
                alignItems='center'
                justify='center'
                pl={{ base: '10', md: '20' }}
                pr={{ base: '10', md: '0' }}
                gap={['0', '70px', '70px', '200px']}
                mt={{ base: '0', md: '50px' }}
                mb={{ base: '30px', md: '150px' }}
                bg={{ base: 'url(/src/assets/images/home-room.jpg)', md: 'white' }}
                height={{ base: '500px', md: 'auto' }}
                bgPosition='center'
            >
                <Box
                    width={{ base: 'auto', md: '340px' }}
                    zIndex='20'
                >
                    <Text
                        color='#1FA8F6'
                        fontSize={{ base: '30px', md: '40px', lg: '48px' }}
                        fontWeight='600'
                        lineHeight='47px'
                        width={{ base: 'auto', md: '270px' }}
                    >
                        Find Room, Save Life
                    </Text>
                    <Text
                        fontSize={{ base: '16px', md: '18px' }}
                        fontWeight='400'
                        lineHeight='30px'
                        mt={['20px', '25px', '36px']}
                        mb={['20px', '30px', '40px']}
                    >
                        Kami memberikan Informasi kamar Rumah Sakit secara real-time bagi anda dan keluarga
                    </Text>
                    <Button
                        color='white'
                        bg='#3AB8FF'
                        shadow='md'
                        _hover={{ bg: '#1FA8F6' }}
                    >
                        Daftar Sekarang <ChevronRightIcon />
                    </Button>
                </Box>
                <Box
                    bg={'#FFFFFFAD'}
                    height='500px'
                    position='absolute'
                    zIndex='1'
                    top='0'
                    width='full'
                    display={{ base: 'block', md: 'none' }}
                >
                </Box>
                <Image
                    // height={['400px', '500px','315px', 'auto']}
                    display={{ base: 'none', md: 'block' }}
                    width='auto'
                    maxWidth={{ base: 'auto', sm: '40%', md: '40%', lg: '50%', xl: '60%' }}
                    src='/src/assets/images/home-room.jpg'
                    alt='Ruang Rumah Sakit'
                    objectFit='contain'
                />
            </Flex>
        </>
    );
}

export default HeroComponent;
