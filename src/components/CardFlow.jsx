import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardBody,
    Text
}
    from '@chakra-ui/react'

const CardFlow = ({desc, number}) => {
    return (
        <Card
            shadow='lg'
            align='center'
            height='250px'
            py='5'
            width='360px'  
            borderRadius='xl'
        >
            <CardBody>
                <Box
                    width={['220px']}
                    mx='auto'
                >
                    <Box 
                        width='70px'
                        height='70px'
                        position='relative'
                        bg='alta.primary'
                        mx='auto'
                        borderRadius='full'
                    >
                        <Text
                            position='absolute'
                            top='3'
                            left='7'
                            color='white'
                            fontWeight='500'
                            fontSize='30px'
                        >
                            {number}
                        </Text>
                    </Box>
                    <Text
                        align='center'
                        fontSize='20px'
                    >
                        {desc}
                    </Text>
                </Box>
            </CardBody>
        </Card>
    );
}

export default CardFlow;
