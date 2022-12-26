import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import NavCariDokter from '../components/NavCariDokter';
import Footer from '../components/Footer';
import CardDetailDokter from '../components/CardDetailDokter';

function DetailDokter() {
  return (
    <Box w="full">
      {' '}
      <NavCariDokter />
      <CardDetailDokter />
      <Footer />
    </Box>
  );
}

export default DetailDokter;
