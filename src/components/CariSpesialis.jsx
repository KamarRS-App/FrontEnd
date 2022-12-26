import React from 'react';
import { Box, Heading, HStack, Text, Select } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
function CariSpesialis() {
  return (
    <Box w="full">
      <Card align="center" variant="elevated" mx={10}>
        <CardHeader>
          <Heading fontWeight={600} fontSize={36} color="#1FA8F6">
            {' '}
            Temukan spesialis / klinik{' '}
          </Heading>
        </CardHeader>
        <CardBody>
          <Box w={688}>
            <Text fontWeight={400} fontSize={18} align="center">
              Temukan spesialis/klinik yang tepat untuk menangani kebutuhan kesehatan Anda. Anda dapat mencari berdasarkan nama, spesialisasi, lokasi rumah sakit, dan jadwal praktik di sini.
            </Text>
          </Box>
        </CardBody>
      </Card>
      <Box m={10}>
        <HStack spacing={200} fontWeight={400} fontSize={16} color="#1FA8F6" align="flex-start">
          <Text ml={10}>Kabupaten/Kota</Text>
          <Text>Rumah Sakit</Text>
          <Text>Spesialis</Text>
          <Text>Hari</Text>
          <Text>Dokter</Text>
        </HStack>
        <HStack spacing={3} fontWeight={400} fontSize={16} color="#ADB8CC" mb={20}>
          <Select placeholder="Kabupaten/Kota" size="md" />
          <Select placeholder="Rumah Sakit" size="md" />
          <Select placeholder="Spesialis" size="md" />
          <Select placeholder="Hari" size="md" />
          <Select placeholder="Dokter" size="md" />
        </HStack>
      </Box>
    </Box>
  );
}

export default CariSpesialis;
