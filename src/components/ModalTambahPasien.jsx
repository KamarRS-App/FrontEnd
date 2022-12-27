import React from 'react';
import { Box, Text, FormControl, Flex, Spacer, Input, Center, Button, FormLabel } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
function ModalTambahPasien() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box flexBasis={{ base: '100%', lg: '70%' }} mr={{ base: 0, xl: '30px' }} m={5}>
      <Box borderWidth={'2px'} p="5" rounded={'10px'} py="10">
        <Box>
          <Text fontSize={20} fontWeight={500}>
            Detail Pasien
          </Text>
          <Text fontSize={13} fontWeight={500} color="#D0D0D0">
            Silahkan Lengkapi Data Pasien Untuk Buat Janji
          </Text>
        </Box>
        <Box m={8} mt={10}>
          <FormControl>
            <Box mt={5}>
              <Flex>
                <Box flexBasis={'45%'}>
                  <FormLabel fontSize={12} fontWeight={500} color="#152C5B">
                    Nama Depan
                  </FormLabel>
                  <Input type="text" />
                </Box>
                <Spacer />
                <Box flexBasis={'45%'}>
                  <FormLabel fontSize={12} fontWeight={500} color="#152C5B">
                    Nama Belakang
                  </FormLabel>
                  <Input type="text" />
                </Box>
              </Flex>
            </Box>
            <Box mt={5}>
              <Flex>
                <Box flexBasis={'45%'}>
                  <FormLabel fontSize={12} fontWeight={500} color="#152C5B">
                    Email
                  </FormLabel>
                  <Input type="email" />
                </Box>
                <Spacer />
                <Box flexBasis={'45%'}>
                  <FormLabel fontSize={12} fontWeight={500} color="#152C5B">
                    No Handphone
                  </FormLabel>
                  <Input type="number" />
                </Box>
              </Flex>
            </Box>
            <Box mt={5}>
              <Flex>
                <Box flexBasis={'45%'}>
                  <FormLabel fontSize={12} fontWeight={500} color="#152C5B">
                    Alamat
                  </FormLabel>
                  <Input type="text" />
                </Box>
                <Spacer />
                <Box flexBasis={'45%'}>
                  <FormLabel fontSize={12} fontWeight={500} color="#152C5B">
                    No KTP/NIK
                  </FormLabel>
                  <Input type="number" />
                </Box>
              </Flex>
            </Box>
          </FormControl>
          <Center>
            {' '}
            <Button mt={10} onClick={onClose}>
              Selesaikan Pendaftaran
            </Button>
          </Center>
        </Box>
      </Box>
    </Box>
  );
}

export default ModalTambahPasien;
