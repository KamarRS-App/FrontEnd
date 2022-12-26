import React from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  Img,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import gambarRoemahSakit from "../assets/images/GambarRoemahSakit.svg";
import Layout from "../components/Layout";

function DetailCariRumahSakit() {
  return (
    <Layout>
      <Box minW="100%" minH="100vh" h="100%">
        <Box
          px={{ base: "10", sm: "12", md: "16", lg: "24", xl: "36" }}
          pt="10"
          pb="36"
          minH="100vh"
          h="100%"
        >
          <Box w="100%">
            <Flex direction={{ base: "column", sm: "column", md: "row" }}>
              <Box h="fit" rounded="20px" borderWidth="2px" flexBasis="1/2">
                <Image
                  src={gambarRoemahSakit}
                  w="100%"
                  rounded="20px"
                  p="10px"
                />
              </Box>
              <Box
                ml={{ base: "60px", lg: "40px", md: "20px" }}
                my="auto"
                h="100%"
                w="100%"
                mx="0"
                flexBasis="1/2"
              >
                <Box mt={{ base: 5, md: 0 }}>
                  <Text fontWeight="bold">RS Haji Surabaya</Text>
                  <Text color="gray">
                    Jalan Manyar Kertoadi No 13, Klampisngasem, Kec. Sukolilo,
                    Kota Surabaya, Jawa Timur 60116
                  </Text>
                  <Text fontWeight="bold">Kontak:</Text>
                  <Text color="gray">0812121212</Text>
                  <Text fontWeight="bold">Jam Buka:</Text>
                  <Text color="gray">Open 24 hours</Text>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box w="100%" pt="100px">
            <Flex>
              <Text fontWeight="bold" mr="20px" color="alta.primary">
                Update:
              </Text>
              <Text color="alta.primary">2022/12/21 11.22 WIB</Text>
            </Flex>
          </Box>
          <Box w="100%" mt="14">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="alta.primary">No</Th>
                    <Th color="alta.primary">Kelas</Th>
                    <Th color="alta.primary">Tempat Tidur</Th>
                    <Th color="alta.primary">Jumlah Kosong</Th>
                    <Th color="alta.primary">Status</Th>
                    <Th color="alta.primary">Tindakan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>1</Td>
                    <Td>VVIP</Td>
                    <Td>12</Td>
                    <Td>0</Td>
                    <Td color="red">Tidak Tersedia</Td>
                    <Td>
                      <Button
                        isDisabled
                        backgroundColor="white"
                        borderWidth="2px"
                      >
                        Daftar
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>2</Td>
                    <Td>VIP</Td>
                    <Td>12</Td>
                    <Td>0</Td>
                    <Td color="red">Tidak Tersedia</Td>
                    <Td>
                      <Button
                        isDisabled
                        backgroundColor="white"
                        borderWidth="2px"
                      >
                        Daftar
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>3</Td>
                    <Td>Kelas I</Td>
                    <Td>16</Td>
                    <Td>1</Td>
                    <Td color="green">Tersedia</Td>
                    <Td>
                      <Button
                        bg="#3AB8FF"
                        _hover={{ bg: "alta.primary" }}
                        color="white"
                        borderWidth="2px"
                      >
                        Daftar
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>4</Td>
                    <Td>Kelas II</Td>
                    <Td>18</Td>
                    <Td>3</Td>
                    <Td color="green">Tersedia</Td>
                    <Td>
                      <Button
                        bg="#3AB8FF"
                        _hover={{ bg: "alta.primary" }}
                        color="white"
                        borderWidth="2px"
                      >
                        Daftar
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>5</Td>
                    <Td>Kelas III</Td>
                    <Td>22</Td>
                    <Td>7</Td>
                    <Td color="green">Tersedia</Td>
                    <Td>
                      <Button
                        bg="#3AB8FF"
                        _hover={{ bg: "alta.primary" }}
                        color="white"
                        borderWidth="2px"
                      >
                        Daftar
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default DetailCariRumahSakit;
