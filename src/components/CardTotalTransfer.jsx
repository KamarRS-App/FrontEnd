import React from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { SimpleGrid, Center } from '@chakra-ui/react';

function CardTotalTransfer({ kode_daftar, biaya_registrasi }) {
  return (
    <Card
      width="full"
      justifyContent="end"
      maxWidth={{ md:'300px',lg:'400px' }}
    >
      <CardHeader>
        <Text fontSize={20} fontWeight={700} color="#072051" m="5" alignItems="center">
          Pendaftaran Kamar Rawat Inap
        </Text>
      </CardHeader>
      <Divider />
      <CardBody>
        <Center>
          <SimpleGrid columns={2} spacing={8} color="#072051">
            <Text>Kode Daftar :</Text>
            <Text>{kode_daftar}</Text>
            <Text>Biaya pendaftaran : </Text>
            <Text> Rp. {biaya_registrasi}</Text>
            <Text fontSize={20} fontWeight={800}>
              Total Transfer :{' '}
            </Text>
            <Text fontSize={20} fontWeight={800}>
              Rp. {biaya_registrasi}
            </Text>
          </SimpleGrid>
        </Center>
      </CardBody>
    </Card>
  );
}

export default CardTotalTransfer;
