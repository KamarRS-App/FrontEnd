import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import NavCariDokter from '../components/NavCariDokter';
import HeaderCariDokter from '../components/HeaderCariDokter';
import { HStack, Select } from '@chakra-ui/react';
import CariSpesialis from '../components/CariSpesialis';
import CardCariDokter from '../components/CardCariDokter';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

function CariDokter() {
  return (
    <Layout>
      <Box w="full">
        {' '}
        <HeaderCariDokter />
        <CariSpesialis />
      </Box>
    </Layout>
  );
}

export default CariDokter;
