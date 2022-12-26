import React from 'react';
import { Center, SimpleGrid } from '@chakra-ui/react';

import { Box, Image, Heading, CardHeader, CardBody, Button, Stack, StackDivider, Text, Card } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
function CardDetailDokter() {
  return (
    <SimpleGrid columns={2} spacing={4} mb={100}>
      <Center>
        <Box flexDirection="column">
          <Image w={[150, 250, 330]} src="/public/images/doctor-dummy-3-big.png"></Image>
        </Box>
      </Center>
      <Box>
        <Card mr={50} align="flex-start">
          <CardHeader>
            <Button colorScheme="teal" variant="link" mt={2} fontWeight={600} fontSize={24} color="#19345E">
              dr. Achraf Hakimi, Sp.An-KIC, FIP
            </Button>
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
              <Box>
                <Text fontWeight={600} fontSize={18} color="#19345E">
                  Jadwal Praktik
                </Text>
              </Box>
              <Box direction={['column', 'column', 'row', 'row']}>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Senin</Th>
                        <Th>Selasa</Th>
                        <Th isNumeric>Jumat</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>08.00 - 12.00 </Td>
                        <Td>08.00 - 12.00</Td>
                        <Td>14.00 - 16.00</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </SimpleGrid>
  );
}

export default CardDetailDokter;
