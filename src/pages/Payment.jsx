import React from 'react';
import CardPayment from '../components/CardPayment';
import CardTotalTransfer from '../components/CardTotalTransfer';
import { Grid, SimpleGrid, Spacer } from '@chakra-ui/react';
import { Center, Container } from '@chakra-ui/react';
import { Wrap, WrapItem, Heading, Box, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Payment() {
  return (
    <Box>
      <Navbar />
      <Wrap>
        <Text fontWeight={700} fontSize={30} color="#1FA8F6">
          Pembayaran Pendaftaran Kamar Rawat Inap
        </Text>
        <WrapItem>
          <CardPayment />
        </WrapItem>
        <WrapItem>
          <CardTotalTransfer />
        </WrapItem>
      </Wrap>
      <Footer />
    </Box>
  );
}

export default Payment;
