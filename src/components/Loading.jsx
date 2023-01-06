import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, Grid, Text } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import React from 'react';
import imgLoading from '../assets/images/logo_rawat_inap.svg';

const Loading = ({body}) => {
    return (
        <Flex
            flexDirection={'column'}
            justify='center'
            minHeight={'100vh'}
            width={'500px'}
            mx={'auto'}
            textAlign={'center'}
        >
            <Center>
                <CircularProgress isIndeterminate color='#1FA8F6' size={'150px'} />
            </Center>
            <Center>
                <Image src={imgLoading} width={'150px'} mt={'10'} />
            </Center>
            <Text
                color={'#1FA8F6'}
                mt={'5'}
                fontSize={'20px'}
            >
                {body}
            </Text>
        </Flex>
    );
}

export default Loading;
