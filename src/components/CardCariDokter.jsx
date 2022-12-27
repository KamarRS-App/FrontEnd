import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button, Image, StackDivider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Icon } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
function CardCariDokter() {
  return (
    <Box m={10} w="full" cursor="pointer">
      <Box mb={5} fontWeight={400} fontSize={16} color="#828282">
        <Text>Menampilkan urutan berdasarkan Abjad</Text>
      </Box>

      <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" mb={10}>
        <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src="/public/images/doctor-dummy-3.png" alt="doctor achraf" />
        <Box>
          <CardHeader>
            <Link href="/detail/dokter" colorScheme="teal" variant="link" mt={2} fontWeight={600} fontSize={24} color="#19345E">
              {' '}
              dr. Achraf Hakimi, Sp.An-KIC, FIP
            </Link>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />}>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Spesialis
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Spesialis Anastesi
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Rumah Sakit
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  RS Haji Surabaya
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  PoliKlinik
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Klinik Anastesi
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Box>
      </Card>
      <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" mb={10}>
        <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src="/public/images/doctor-dummy-2.png" alt="doctor achraf" />
        <Box>
          <Box columns={2} spacing={10}>
            <CardHeader>
              <Button colorScheme="teal" variant="link" mt={2} fontWeight={600} fontSize={24} color="#19345E">
                drg. Hakim Ziyech, Sp.Ort
              </Button>
            </CardHeader>
          </Box>

          <CardBody>
            <Stack divider={<StackDivider />}>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Spesialis
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Spesialis Ortodonti
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Rumah Sakit
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  RS Haji Surabaya
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  PoliKlinik
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Klinik Gigi
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Box>
      </Card>
      <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" mb={10}>
        <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src="/public/images/doctor-dummy-1.png" alt="doctor amrabat" />
        <Box>
          <CardHeader>
            <Button colorScheme="teal" variant="link" mt={2} fontWeight={600} fontSize={24} color="#19345E">
              dr. Amrabat, Sp.A, M.Sc
            </Button>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />}>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Spesialis
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Spesialis Anak
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Rumah Sakit
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  RS Haji Surabaya
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  PoliKlinik
                </Heading>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Klinik Anak
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Box>
      </Card>
    </Box>
  );
}

export default CardCariDokter;
