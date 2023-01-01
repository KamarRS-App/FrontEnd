import React from 'react';
import { Box, Heading, SimpleGrid, Text, Button } from '@chakra-ui/react';
import NavCariDokter from '../components/NavCariDokter';
import { MdBuild, MdArrowBack } from 'react-icons/md';
import Footer from '../components/Footer';
import CardDetailDokter from '../components/CardDetailDokter';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
function DetailDokter() {
  let navigate = useNavigate();
  return (
    <Box w="full">
      {' '}
      <Layout>
        <Box align="end" m={20}>
          <Button leftIcon={<MdArrowBack />} colorScheme="#1FA8F6" variant="custom" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
        <CardDetailDokter />
      </Layout>
    </Box>
  );
}

export default DetailDokter;
