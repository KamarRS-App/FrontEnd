import React from 'react';
import { Center } from '@chakra-ui/react';
import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import dokter from '../assets/images/doctor_hero.png';

function HeaderCariDokter() {
  return (
    <Box>
      <Flex direction={['column', 'column', 'row']} alignItems="center" justify="center">
        <SimpleGrid columns={2} m={[20, 30, 40]} align="flex-start" flexBasis={{ base: 'auto', md: 'auto' }}>
          <Center>
            <Box>
              <Box>
                <Heading fontWeight={600} fontSize={['24px', '32px', '48px']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
                  Find Specialities,
                </Heading>
                <Text fontWeight={600} fontSize={['24px', '32px', '48px']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
                  Save Life
                </Text>
              </Box>
              <Box w={445}>
                <Text fontWeight={400} fontSize={18} color="#000000" pt={5}>
                  Kami menyediakan pelayanan spesialils terbaik bagi anda dan keluarga
                </Text>
              </Box>
            </Box>
          </Center>
          <Box direction="cols" mt={50} maxWidth={500}>
            <Flex>
              <Image objectFit="cover" src={dokter} alt="doctor_hero" fallbackSrc="https://via.placeholder.com/150" />
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
}

export default HeaderCariDokter;
