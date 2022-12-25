import React from 'react';
import CardPayment from '../../components/CardPayment';
import CardTotalTransfer from '../../components/CardTotalTransfer';
import { Grid, SimpleGrid, Spacer } from '@chakra-ui/react';
import { Center, Container } from '@chakra-ui/react';
import { Wrap, WrapItem, Heading } from '@chakra-ui/react';
function Payment() {
  return (
    <Wrap>
      <Heading fontWeight={700} fontSize={30} color="#1FA8F6" m={40}>
        Pembayaran Pendaftaran Kamar Rawat Inap
      </Heading>
      <WrapItem>
        <CardPayment />
      </WrapItem>
      <WrapItem>
        <CardTotalTransfer />
      </WrapItem>
    </Wrap>
  );
}

export default Payment;
