import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import React from 'react';

const CardAdmin = () => {
    return (
        <Card
            bg='white'
            shadow='none'
            px={{ base:'2',md:'5' }}
        >
            <CardBody>
                <Text
                    color='#B0B0B0'
                    fontSize={{ base:'12px',lg:'18px' }}
                >
                    Kamar Tersedia
                </Text>
                <Text
                    fontSize={{ base:'20px', sm:'40px',lg:'72px' }}
                    fontWeight='700'
                    color='#1FA8F6'
                >
                    197
                </Text>
            </CardBody>
        </Card>
    );
}

export default CardAdmin;
