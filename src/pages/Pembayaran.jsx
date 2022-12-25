import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  Flex,
  Input,
  Spacer,
  Checkbox,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Layout from "../components/Layout";

function Pembayaran() {
  return (
    <Layout>
      <Box px={{ base: 10, xl: 36 }} py={10} my={10}>
        <Flex direction={{ base: "column", xl: "row" }}>
          <Box
            flexBasis={{ base: "100%", lg: "70%" }}
            mr={{ base: 0, xl: "30px" }}
          >
            <Box borderWidth={"2px"} p="5" rounded={"10px"} py="10">
              <Box>
                <Flex justifyContent={"space-between"}>
                  <Text fontWeight={"semibold"}>Detail Pasien</Text>
                  <Text color={"alta.primary"} fontWeight={"bold"}>
                    Simpan
                  </Text>
                </Flex>
              </Box>
              <Box mx={5} mt={10}>
                <FormControl>
                  <Box>
                    <Flex>
                      <Box flexBasis={"45%"}>
                        <FormLabel>Nama Depan</FormLabel>
                        <Input type="text" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={"45%"}>
                        <FormLabel>Nama Belakang</FormLabel>
                        <Input type="text" />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={"45%"}>
                        <FormLabel>No. KTP</FormLabel>
                        <Input type="number" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={"45%"}>
                        <FormLabel>No. BPJS</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={"45%"}>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Input type="text" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={"45%"}>
                        <FormLabel>Usia</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={"45%"}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={"45%"}>
                        <FormLabel>No. Handphone</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <FormLabel>Alamat</FormLabel>
                    <Input type="text" />
                  </Box>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={"45%"}>
                        <FormLabel>Provinsi</FormLabel>
                        <Input type="text" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={"45%"}>
                        <FormLabel>Kabupaten / Kota</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <FormLabel>Alamat Domisili</FormLabel>
                    <Input type="text" />
                  </Box>
                  <Box mt={5}>
                    <Flex>
                      <Box flexBasis={"45%"}>
                        <FormLabel>Provinsi</FormLabel>
                        <Input type="text" />
                      </Box>
                      <Spacer />
                      <Box flexBasis={"45%"}>
                        <FormLabel>Kabupaten / Kota</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>
                  </Box>
                </FormControl>
              </Box>
            </Box>
            <Box mt={10}>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <Flex justifyContent={"space-between"}>
                          <Text fontWeight={"semibold"} fontSize={"2xl"}>
                            Jumlah yang harus dibayar
                          </Text>
                          <Text
                            color={"alta.primary"}
                            fontWeight={"semibold"}
                            fontSize={"2xl"}
                          >
                            Rp. 25.000
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box>
                      <Flex justifyContent={"space-between"}>
                        <Text>Biaya Administrasi Rumah Sakit</Text>
                        <Text>25.000</Text>
                      </Flex>
                      <Flex justifyContent={"space-between"} mt={"3"}>
                        <Text>Biaya Pendaftaran ke Rumah Sakit</Text>
                        <Text>Gratis</Text>
                      </Flex>
                      <Flex justifyContent={"space-between"} mt={"3"}>
                        <Text>Biaya Penyediaan Kamar</Text>
                        <Text>Gratis</Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>
          <Box flexBasis={"30%"} pt={{ base: 5, lg: "0" }}>
            <Box borderWidth={"2px"} p="12" rounded={"10px"}>
              <Text fontWeight={"semibold"} textAlign="center">
                Pendaftaran Kamar Rawat Inap
              </Text>
              <Box borderTop={"1px"} mt={"5"} pt={"5"}>
                <Flex justifyContent={"space-between"}>
                  <Text>Hari:</Text>
                  <Text>Senin</Text>
                </Flex>
              </Box>
              <Flex justifyContent={"space-between"} mt={5}>
                <Text>Tanggal:</Text>
                <Text>26 Desember 2022</Text>
              </Flex>
              <Flex justifyContent={"space-between"} mt={5}>
                <Text>Tipe Kamar:</Text>
                <Text>Kelas I</Text>
              </Flex>
              <Flex justifyContent={"space-between"} mt={5}>
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

export default Pembayaran;
