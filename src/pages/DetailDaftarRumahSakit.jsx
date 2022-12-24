import React from "react";
import Layout from "../components/Layout";
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
} from "@chakra-ui/react";

function DetailDaftarRumahSakit() {
  return (
    <Layout>
      <Box px={36} py={10} my={10}>
        <Flex>
          <Box flexBasis={"70%"} mr={"30px"}>
            <Box borderWidth={"2px"} p="5" rounded={"10px"}>
              <Text fontWeight={"semibold"}>Login sebagai Almira Mahsa</Text>
              <Text color={"gray"}>Almira Mahsa (Google)</Text>
            </Box>
            <Box borderWidth={"2px"} p="5" rounded={"10px"} mt={5} py="10">
              <Box>
                <Flex justifyContent={"space-between"}>
                  <Text fontWeight={"semibold"}>Data Pemesan</Text>
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
                </FormControl>
              </Box>
            </Box>
            <Box borderWidth={"2px"} p="5" rounded={"10px"} mt={5} py="10">
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
                  <Box mt={10}>
                    <Checkbox defaultChecked>
                      Semua data telah terisi dengan sebenar-benarnya
                    </Checkbox>
                  </Box>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box flexBasis={"30%"}>
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
      <Box textAlign={"center"} my={20}>
        <Button backgroundColor={"alta.primary"} color={"white"} p={6}>
          Lanjutkan Pembayaran →
        </Button>
      </Box>
    </Layout>
  );
}

export default DetailDaftarRumahSakit;
