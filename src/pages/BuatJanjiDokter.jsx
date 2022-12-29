import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Text, Flex, Input, Spacer, Checkbox, Button, Divider, Center, Card, CardHeader, SimpleGrid, CardBody } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ModalDataPasien from '../components/ModalDataPasien';
import { MdBuild, MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
function BuatJanjiDokter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();
  return (
    <Layout>
      <Box align="end" m={20}>
        <Button leftIcon={<MdArrowBack />} colorScheme="#1FA8F6" variant="custom" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
      <Box px={{ base: 10, xl: 36 }} mb={30}>
        <Flex direction={{ base: 'column', xl: 'row' }}>
          <Box flexBasis={{ base: '100%', lg: '70%' }} mr={{ base: 0, xl: '30px' }}>
            <Box borderWidth={'2px'} p="5" rounded={'10px'} my={5}>
              <Text fontSize={18} fontWeight={500} color="#072051">
                Login Sebagai Almira Mahsa
              </Text>
              <Text fontSize={16} fontWeight={400} color="#D0D0D0">
                Almira Mahsa (Google)
              </Text>
            </Box>

            <Box borderWidth={'2px'} p="5" rounded={'10px'} py="10">
              <Box>
                <Text fontSize={18} fontWeight={500}>
                  Detail Pemesan
                </Text>
                <Text fontSize={13} fontWeight={500} m={2} color="#D0D0D0">
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
                  <Button onClick={onOpen} mt={20} bg="#1FA8F6" color="#FFFFFFE5">
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
          <Card w={400} ml={[30, 40, 20]} justifyContent="end">
            <CardHeader>
              <Text fontSize={18} fontWeight={600} my={2} color="#072051" textAlign="center">
                Pendaftaran Medical Checkup
              </Text>
            </CardHeader>
            <Divider />
            <CardBody fontSize={16}>
              <Center>
                <SimpleGrid columns={2} spacing={8} color="#072051">
                  <Text>Hari :</Text>
                  <Text>Senin</Text>
                  <Text>Tanggal : </Text>
                  <Text>02-01-2023</Text>
                  <Text>Dokter Pilihan : </Text>
                  <Text>dr. Amrabat, Sp.A, M.Sc </Text>
                  <Text>Spesialis : </Text>
                  <Text>Anak </Text>
                  <Text>Rumah Sakit : </Text>
                  <Text>RS Haji Surabaya </Text>
                </SimpleGrid>
              </Center>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </Layout>
  );
}

export default BuatJanjiDokter;
