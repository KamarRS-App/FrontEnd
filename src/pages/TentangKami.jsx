import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import { Box, Heading, Text, Button, Image, Card } from '@chakra-ui/react';
import { Grid, GridItem, SimpleGrid, Flex } from '@chakra-ui/react';
import CardFlow from '../components/CardFlow';
import Layout from '../components/Layout';
import hospitalAbout from '../assets/images/hospital-about-us.png';

function TentangKami() {
  return (
    <Box>
      <Layout>
        <Text fontWeight="600" ml={20} fontSize={['24px', '32px']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
          Tentang Kami
        </Text>
        <SimpleGrid columns={2} align="flex-start" flexBasis={{ base: '100%', md: 'auto' }}>
          <Box direction="cols" m={20} w={700} h={595}>
            <Image src={hospitalAbout} alt="doctor_hero" fallbackSrc="https://via.placeholder.com/150" />
          </Box>
          <Box>
            <SimpleGrid rows={2} m={40}>
              <Image w={150} src="/images/logo-rawat-inap.png" alt="logo rawat inap" fallbackSrc="https://via.placeholder.com/150" />
              <Card w={400} variant="unstyled">
                <Text fontWeight={400} fontSize={18} color="#072051" pt={5} lineHeight={9}>
                  Rawat Inap merupakan sebuah platform kesehatan digital penyedia informasi ketersediaan kamar rumah sakit secara real-time, akurat dan transparan yang dapat diakses oleh siapa saja. Kami hadir dengan tim terbaik untuk
                  menangani kebutuhan kesehatan Anda.
                </Text>
              </Card>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
        <Text fontWeight="600" ml={20} fontSize={['24px', '32px']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
          Layanan Unggulan Kami
        </Text>
        <Flex templateColumns="repeat(2, 1fr)" rowGap="20" columnGap="10" flexWrap="wrap" justifyContent="center" my={20}>
          <CardFlow desc="Informasi ketersediaan  kamar rumah sakit secara real-time, akurat dan transparan " number="1" />
          <CardFlow desc="Buat janji konsultasi dengan dokter  umum maupun spesialis berpengalaman yang tersebar di seluruh rumah sakit di Indonesia." number="2" />
        </Flex>
      </Layout>
    </Box>
  );
}

export default TentangKami;
