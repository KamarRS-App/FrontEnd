import React from 'react';
import { Box} from '@chakra-ui/react';
import HeaderCariDokter from '../components/HeaderCariDokter';
import CariSpesialis from '../components/CariSpesialis';
import Layout from '../components/Layout';

function CariDokter() {
  return (
    <Layout>
      <Box w="full">
        <HeaderCariDokter />
        <CariSpesialis />
      </Box>
    </Layout>
  );
}

export default CariDokter;
