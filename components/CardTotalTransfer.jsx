import React from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { SimpleGrid, Center } from '@chakra-ui/react';

function CardTotalTransfer() {
  return (
    <Card w={400} m={[30, 40, 50]} width="full" justifyContent="end">
      <CardHeader>
        <Text fontSize={20} fontWeight={700} color="#072051" m="5" lignItems="center">
          Pendaftaran Kamar Rawat Inap
        </Text>
      </CardHeader>
      <Divider />
      <CardBody>
        <Center>
          <SimpleGrid columns={2} spacing={8} color="#072051">
            <Text>Kode Daftar :</Text>
            <Text>#B01013FEBE</Text>
            <Text>Biaya pendaftaran : </Text>
            <Text>25.000</Text>
            <Text>Kode Unik : </Text>
            <Text>124 </Text>
            <Text fontSize={20} fontWeight={800}>
              Total Transfer :{' '}
            </Text>
            <Text fontSize={20} fontWeight={800}>
              25.124{' '}
            </Text>
          </SimpleGrid>
        </Center>
      </CardBody>
    </Card>
  );
}

export default CardTotalTransfer;
