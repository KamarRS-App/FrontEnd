import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';

function HeaderCariRS() {
  return (
    <SimpleGrid columns={2}>
      <Center>
        <Box color="#1FA8F6" w={522} h={529} pt={150}>
          <Heading fontWeight={600} fontSize={48}>
            Find Room,
          </Heading>
          <Heading fontWeight={600} fontSize={48}>
            Save Life
          </Heading>
          <Text fontWeight={400} fontSize={18} color="#000000" pt={5}>
            Kami memberikan Informasi kamar Rumah Sakit secara real-time bagi anda dan keluarga
          </Text>
        </Box>
      </Center>

      <Box direction="cols" mt={135}>
        <Wrap>
          <Image w={230} objectFit="cover" src="/public/Images/rs-mitra-keluarga.png" alt="rs-mitra-keluarga" fallbackSrc="https://via.placeholder.com/150" />
          <Image w={230} objectFit="cover" src="/public/Images/rs-haji.png" alt="rs-haji-surabaya" fallbackSrc="https://via.placeholder.com/150" />
          <Image w={230} src="/public/Images/rs-sardjito.png" alt="rs-sardjito" fallbackSrc="https://via.placeholder.com/150" />
        </Wrap>
      </Box>
    </SimpleGrid>
  );
}

export default HeaderCariRS;
