import React from 'react';
import { Box, Center, Flex, VStack, StackDivider, Image, Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import Footer from '../components/Footer';

function PembayaranSelesai() {
  return (
    <Center>
      <Box divider={<StackDivider borderColor="gray.200" />} spacing={4} align="center">
        <Box h={108} w={[200, 250, 500]} mb={5}>
          <Text fontSize={{ base: '24px', md: '32px', lg: '36px' }} fontWeight={600} color="#152C5B" mt={50}>
            Pendaftaran anda telah kami terima!
          </Text>
        </Box>
        <Center>
          <Box w={506}>
            <Image src="/public/images/finish.png" w={[150, 250, 330]} />
          </Box>
        </Center>

        <Box h={95} w={[200, 250, 500]}>
          <Text color="#B0B0B0" fontSize={{ base: '14px', md: '18px', lg: '20px' }}>
            Kami akan mengirimkan invoice dan detail pendaftaran kamar melalui alamat email yang telah di daftarkan
          </Text>
        </Box>
        <Box h={20} w={362}>
          <Button color="#3AB8FF" fontSize={{ base: '12px', md: '14px', lg: '16px' }} variant="outline">
            Kembali Ke Beranda
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default PembayaranSelesai;
