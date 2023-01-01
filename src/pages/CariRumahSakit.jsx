import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/Layout';
import TableListHospital from '../components/TableListHospital';
function CariRumahSakit() {
  return (
    <Layout>
      <Box>
        <Flex direction={['column-reverse', 'column-reverse', 'row']} alignItems="center" justify="center">
          <Center>
            <Box color="#1FA8F6" w={['300px', '350px', '500px']} h={['200px', '400px', '400px']} mt={50}>
              <Heading fontWeight={600} fontSize={['30px', '42px']} mr={10}>
                Find Room,
              </Heading>
              <Heading fontWeight={600} fontSize={['30px', '42px']}>
                Save Life
              </Heading>
              <Box w={['200px', '350px', '400px']}>
                <Text fontWeight={400} fontSize={['12px', '18px']} color="#000000" pt={5}>
                  Kami menyediakan pelayanan spesialis terbaik bagi anda dan keluarga
                </Text>
              </Box>
            </Box>
          </Center>

          <Box>
            <Flex direction="row" gap="2" wrap="wrap" mt={['50px', '100px', '20px']}>
              <Image w={['90px', '150px', '200px']} objectFit="cover" src="/src/assets/images/rs-mitra-keluarga.png" alt="rs-mitra-keluarga" fallbackSrc="https://via.placeholder.com/150" />
              <Image w={['90px', '150px', '200px']} objectFit="cover" src="/src/assets/images/rs-haji.png" alt="rs-haji-surabaya" fallbackSrc="https://via.placeholder.com/150" />
              <Image w={['90px', '150px', '200px']} src="/src/assets/images/rs-sardjito.png" alt="rs-sardjito" fallbackSrc="https://via.placeholder.com/150" />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box mt={20}>
        <TableListHospital />
      </Box>
    </Layout>
  );
}

export default CariRumahSakit;
