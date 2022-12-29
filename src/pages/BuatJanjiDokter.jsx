import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Text, Flex, Input, Spacer, Checkbox, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Center } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ModalDataPasien from '../components/ModalDataPasien';
function BuatJanjiDokter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout>
      <Box px={{ base: 10, xl: 36 }} py={10} my={10}>
        <Flex direction={{ base: 'column', xl: 'row' }}>
          <Box flexBasis={{ base: '100%', lg: '70%' }} mr={{ base: 0, xl: '30px' }}>
            <Box borderWidth={'2px'} p="5" rounded={'10px'} my={5}>
              <Text fontSize={20} fontWeight={500} color="#072051">
                Login Sebagai Almira Mahsa
              </Text>
              <Text fontSize={18} fontWeight={400} color="#D0D0D0">
                Almira Mahsa (Google)
              </Text>
            </Box>

            <Box borderWidth={'2px'} p="5" rounded={'10px'} py="10">
              <Box>
                <Text fontSize={20} fontWeight={500}>
                  Detail Pemesan
                </Text>
                <Text fontSize={13} fontWeight={500} color="#D0D0D0">
                  Informasi terkait pembuatan janji chekup akan disampaikan melalui email dan nomor ponsel dibawah ini
                </Text>
              </Box>
              <Box mx={5} mt={10}>
                <FormControl>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={'45%'}>
                        <FormLabel>Nama Depan</FormLabel>
                        <Input type="text" placeholder="Almira" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'}>
                        <FormLabel>Nama Belakang</FormLabel>
                        <Input type="text" placeholder="Mahsa" />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={'45%'}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Almiramahsa9@gmail.com" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'}>
                        <FormLabel>No Handphone</FormLabel>
                        <Input type="number" placeholder="085646087878" />
                      </Box>
                    </Flex>
                  </Box>
                </FormControl>
                <Center>
                  {' '}
                  <Button onClick={onOpen} mt={10}>
                    Lanjutkan ke Data Pasien
                  </Button>
                </Center>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                      <ModalDataPasien />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>
          </Box>
          <Box flexBasis={'30%'} pt={{ base: 5, lg: '0' }}>
            <Box borderWidth={'2px'} p="12" rounded={'10px'}>
              <Text fontWeight={'semibold'} textAlign="center">
                Pendaftaran Kamar Rawat Inap
              </Text>
              <Box borderTop={'1px'} mt={'5'} pt={'5'}>
                <Flex justifyContent={'space-between'}>
                  <Text>Hari:</Text>
                  <Text>Senin</Text>
                </Flex>
              </Box>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Tanggal:</Text>
                <Text>26 Desember 2022</Text>
              </Flex>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Tipe Kamar:</Text>
                <Text>Kelas I</Text>
              </Flex>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Rumah Sakit:</Text>
                <Text>RS Haji Surabaya</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default BuatJanjiDokter;
