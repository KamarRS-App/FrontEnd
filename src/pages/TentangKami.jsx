import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import { Box, Heading, Text, Button, Image, Card } from '@chakra-ui/react';
import { Grid, GridItem, SimpleGrid, Flex } from '@chakra-ui/react';
import CardFlow from '../components/CardFlow';
import Layout from '../components/Layout';
import hospitalAbout from '../assets/images/hospital-about-us.png';
import logo from '../assets/images/logo.svg';
function TentangKami() {
  return (
    <Box>
      <Layout>
        <Text fontWeight="600" ml={20} fontSize={['24px', '32px']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
          Tentang Kami
        </Text>
        <Flex direction={['column', 'column', 'row']} alignItems="center" justify="left">
          <Box direction="cols" m={20}>
            <Image src={hospitalAbout} alt="doctor_hero" fallbackSrc="https://via.placeholder.com/150" />
          </Box>

          <Flex>
            <SimpleGrid rows={2} m={[20, 30, 40]}>
              <Image w={150} src={logo} alt="logo rawat inap" fallbackSrc="https://via.placeholder.com/150" />
              <Card w={400} variant="unstyled">
                <Text fontWeight={400} fontSize={18} color="#072051" pt={5} lineHeight={9}>
                  Rawat Inap merupakan sebuah platform kesehatan digital penyedia informasi ketersediaan kamar rumah sakit secara real-time, akurat dan transparan yang dapat diakses oleh siapa saja. Kami hadir dengan tim terbaik untuk
                  menangani kebutuhan kesehatan Anda.
                </Text>
              </Card>
            </SimpleGrid>
          </Flex>
        </Flex>

        <Text fontWeight="600" ml={20} mt={20} fontSize={['24px', '32px']} color="#1FA8F6" textAlign={{ base: 'left', md: 'left' }}>
          Layanan Unggulan Kami
        </Text>

        <Flex templateColumns="repeat(2, 1fr)" rowGap="20" columnGap="10" flexWrap="wrap" justifyContent="center">
          <SimpleGrid rows={2} align="center" flexBasis={{ base: 'auto', md: 'auto' }} m={40}>
            <Box>
              <CardFlow desc="Informasi ketersediaan  kamar rumah sakit secara real-time, akurat dan transparan " number="1" />{' '}
            </Box>
            <Box>
              <CardFlow desc="Buat janji konsultasi dengan dokter  umum maupun spesialis berpengalaman yang tersebar di seluruh rumah sakit di Indonesia." number="2" />
            </Box>
          </SimpleGrid>
        </Flex>
      </Layout>
    </Box>
  );
}

export default TentangKami;
