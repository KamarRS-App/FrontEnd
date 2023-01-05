import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 2500)
    })
    return (
        <Flex
            justify={'center'}
            minHeight={'100vh'}
            alignContent={'center'}
            flexWrap={'wrap'}
        >
            <Image src='/sad.png' />
            <Text
                mt={'8'}
                flexBasis={'100%'}
                textAlign={'center'}
                color={"alta.primary"}
                fontSize={'48px'}
                fontWeight={'500'}
            >
                404 Not Found
            </Text>
            <Text
                flexBasis={'100%'}
                textAlign={'center'}
                fontSize={'20px'}
            >
                Halaman Tidak ditemukan
            </Text>
            <Text
                flexBasis={'100%'}
                textAlign={'center'}
                fontSize={'20px'}
            >
                Kamu akan di redirect ke halaman sebelumnya....
            </Text>
        </Flex>
    );
}

export default NotFound;
