import React from 'react';
import { Center, Container } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
function CariRumahSakit() {
  return (
    <SimpleGrid columns={2} spacing={5}>
      <Center>
        <Wrap>
          <Box color="#1FA8F6" px={10} w={522} h={529} pt={239}>
            <Heading fontWeight="600" fontSize="48px">
              Find Room,
            </Heading>
            <Heading fontWeight="600" fontSize="48px">
              Save Life
            </Heading>
            <Text fontWeight="400" fontSize={18} color="#000000" pt="16px">
              Kami memberikan Informasi kamar Rumah Sakit secara real-time bagi anda dan keluarga
            </Text>
          </Box>
        </Wrap>
      </Center>
      <Wrap>
        <Center>
          <Box direction="row">
            <Image boxSize="100px" objectFit="cover" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            <Image boxSize="150px" objectFit="cover" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            <Image boxSize="200px" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
        </Center>
      </Wrap>
    </SimpleGrid>
  );
}

export default CariRumahSakit;
