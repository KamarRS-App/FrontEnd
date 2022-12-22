import React from 'react';
import Layout from '../components/Layout';
import HeroComponent from '../components/HeroComponent';
import CardFlow from '../components/CardFlow';
import { Box, Text } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <Layout>
            <HeroComponent />
            <Box
                px={['20']}
                my={['20']}
            >
                <Text
                    fontWeight='600'
                    fontSize={['48px']}
                    mb={['10']}
                    color='#1FA8F6'
                >
                    Alur Pendaftaran
                </Text>
                <CardFlow />
            </Box>
        </Layout>
    );
}

export default HomePage;
