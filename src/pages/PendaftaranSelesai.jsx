import React from 'react';
import { Button, Grid } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import finish from '/public/images/finish-img.png';
import Layout from '../components/Layout';

function PendaftaranSelesai() {
  return (
    <Layout>
      <Box minH="100vh" backgroundColor="white" align="center">
        <VStack px={36} py={20} w={700}>
          <Box>
            <Text fontSize={{ base: '20px', md: '24px', lg: '28px' }} fontWeight={600} color="#152C5B" mb={10} textAlign="center" align="center">
              Pendaftaran anda telah kami terima!
            </Text>
            <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }} fontWeight={400} color="#152C5B" textAlign="center" align="center">
              Silahkan kunjungi Rumah Sakit untuk berkonsultasi sesuai dengan jadwal yang anda pilih
            </Text>
            <Box pt={10}>
              <Grid className="justify-center">
                <Image src={finish} alt="berhasil" w={{ base: '150px', md: '200px', lg: '280px' }} />
              </Grid>
            </Box>
            <Text color="#B0B0B0" fontSize={{ base: '12px', md: '14px', lg: '16px' }} textAlign="center" align="center">
              Kami akan mengirimkan detail pendaftaran konsultasi anda melalui alamat email yang telah di daftarkan
            </Text>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}

export default PendaftaranSelesai;
