import { Box, SimpleGrid, Image, Center, Card, Flex } from '@chakra-ui/react';
import React from 'react';
import CardProfilDokter from './CardProfilDokter';
import CardJadwalKunjungan from './CardJadwalKunjungan';

function CardDetailDokter() {
  return (
    <SimpleGrid spacing={2} templateColumns="repeat(auto-fill, minmax(400px, 1fr))" m={10} align="center">
      <Center>
        <Box flexDirection="row">
          <Image w={[150, 250, 320]} src="/public/images/doctor-dummy-3-big.png" mb={100}></Image>
        </Box>
      </Center>
      <CardProfilDokter />
      <CardJadwalKunjungan />
    </SimpleGrid>
  );
}

export default CardDetailDokter;
