import React from 'react';
import { Center } from '@chakra-ui/react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import dokter from '../assets/images/doctor_hero.png';

function HeaderCariDokter() {
  return (
    <Center>
      <SimpleGrid columns={2} align="flex-start" flexBasis={{ base: 'auto', md: 'auto' }}>
        <Center>
          <Box color="#1FA8F6" w={400} h={529} mt={50} mr={10}>
            <Heading fontWeight={600} fontSize={48}>
              Find Specialities,
            </Heading>
            <Heading fontWeight={600} fontSize={48}>
              Save Life
            </Heading>
            <Box w={445}>
              <Text fontWeight={400} fontSize={18} color="#000000" pt={5}>
                Kami menyediakan pelayanan spesialils terbaik bagi anda dan keluarga
              </Text>
            </Box>
          </Box>
        </Center>
        <Box direction="cols" mt={50} maxWidth={500}>
          <Image objectFit="cover" src={dokter} alt="doctor_hero" fallbackSrc="https://via.placeholder.com/150" />
        </Box>
      </SimpleGrid>
    </Center>
  );
}

export default HeaderCariDokter;
