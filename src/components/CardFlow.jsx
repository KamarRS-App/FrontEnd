import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardBody,
    Text
}
    from '@chakra-ui/react'

const CardFlow = () => {
    return (
        <Card
            shadow='lg'
            align='center'
        >
            <CardBody>
                <Box
                    width={['200px']}
                    mx='auto'
                >
                    <Avatar bg='#1FA8F6' name='1' boxSize='70px' fontSize='35' size='0px' />
                    <Text
                        align='center'
                    >
                        Registrasi pasien rawat inap melalui website
                    </Text>
                </Box>
            </CardBody>
        </Card>
    );
}

export default CardFlow;
