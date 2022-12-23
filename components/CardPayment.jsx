import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';
import BankPayment from './BankPayment';
import EWalletPayment from './EWalletPayment';
import Indomeret from './Indomaret';
import Alfa from './Alfa';
function CardPayment() {
  return (
    <Card w={900} mt={50} ml={50} mb={50}>
      <Center>
        <Text fontSize={16} fontWeight={600} color="#1FA8F6" m="5">
          Selesaikan Pembayaran Dalam 19:59 menit
        </Text>
      </Center>
      <CardHeader>
        <Text fontSize={20} fontWeight={600} color="#CDD1E0" m="5">
          Pilih Metode Pembayaran
        </Text>
      </CardHeader>
      <CardBody justifyContent="center" alignItems="center">
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <BankPayment />
          </Box>
          <Box>
            <EWalletPayment />
          </Box>
          <Box>
            <Indomeret />
          </Box>
          <Box>
            <Alfa />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default CardPayment;
