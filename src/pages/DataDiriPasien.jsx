import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import defaultProfile from "../assets/images/defaultProfile.png";
import { Link } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import UploadIcon from "../assets/images/UploadIcon.png";

function DataDiriPasien() {
  return (
    <Box w="full" h="full" color="black">
      <Box w="full">
        <Box p="20">
          <Text fontSize="2xl" color="alta.primary" className="font-semibold">
            Data Diri Pasien
          </Text>
          <Box className="text-end" pt={10}>
            <Button backgroundColor={"alta.primary"} color="white">
              Hapus Akun x
            </Button>
          </Box>
          <Box>
            <Text pt="2" mb="5" fontSize={"md"} fontWeight="semibold">
              Foto Profil
            </Text>
            <Image
              mb="5"
              src={defaultProfile}
              borderRadius="full"
              boxSize="150px"
              colorScheme={"blue"}
            />
            <Text fontSize="md" color={"alta.primary"}>
              Ganti foto profile
            </Text>
          </Box>
          <Box mt={20}>
            <Grid templateColumns="repeat(2, 1fr)" gap={10}>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Nama Depan:</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Nama Belakang</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>No. KTP</FormLabel>
                  <Input type="number" />
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>No BPJS</FormLabel>
                  <Input type="number" />
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select placeholder="-- Pilih jenis kelamin --">
                    <option value="option1">Laki-laki</option>
                    <option value="option2">Perempuan</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Usia</FormLabel>
                  <Input type="number" />
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>No Handphone</FormLabel>
                  <Input type="number" />
                </FormControl>
              </GridItem>
            </Grid>
            <Box mt="10">
              <FormControl isRequired>
                <FormLabel>Alamat Domisili</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} mt="10">
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Provinsi</FormLabel>
                  <Select placeholder="-- Pilih provinsi --">
                    <option value="option1">Aceh</option>
                    <option value="papbaratdaya">Papua Barat Daya</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Kabupaten / Kota</FormLabel>
                  <Select placeholder="-- Pilih kota --">
                    <option value="papbaratdaya">Papua Barat Daya</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem w="100%" h="100%">
                <FormControl isRequired>
                  <FormLabel>Riwayat Penyakit</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
          <Box mt={10}>
            <Text fontWeight={"bold"} color="alta.primary">
              Berkas Penting Pasien
            </Text>
            <FormControl mt={5}>
              <FormLabel>Foto KTP</FormLabel>
              <Input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                display={"none"}
              />
              <Box h={300} borderWidth="1px" rounded={10} w="100%">
                <label for="img" style={{ cursor: "pointer" }}>
                  <Grid
                    justifyContent={"center"}
                    alignItems="center"
                    w="100%"
                    textAlign={"center"}
                  >
                    <Box className="grid justify-center" pt={10}>
                      <Image
                        src={UploadIcon}
                        w="50px"
                        mt={20}
                        textAlign="center"
                      />
                    </Box>
                    <Text fontSize={"2xl"}>
                      Drag & drop files or{" "}
                      <span>
                        <label
                          for="img"
                          style={{
                            cursor: "pointer",
                            color: "#1FA8F6",
                            fontStyle: "inherit",
                          }}
                        >
                          Browse
                        </label>
                      </span>
                    </Text>
                    <Text color={"#676767"}>Supported formates: JPEG, PNG</Text>
                  </Grid>
                </label>
              </Box>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Foto Kartu BPJS</FormLabel>
              <Input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                display={"none"}
              />
              <Box h={300} borderWidth="1px" rounded={10} w="100%">
                <label for="img" style={{ cursor: "pointer" }}>
                  <Grid
                    justifyContent={"center"}
                    alignItems="center"
                    w="100%"
                    textAlign={"center"}
                  >
                    <Box className="grid justify-center" pt={10}>
                      <Image
                        src={UploadIcon}
                        w="50px"
                        mt={20}
                        textAlign="center"
                      />
                    </Box>
                    <Text fontSize={"2xl"}>
                      Drag & drop files or{" "}
                      <span>
                        <label
                          for="img"
                          style={{
                            cursor: "pointer",
                            color: "#1FA8F6",
                            fontStyle: "inherit",
                          }}
                        >
                          Browse
                        </label>
                      </span>
                    </Text>
                    <Text color={"#676767"}>Supported formates: JPEG, PNG</Text>
                  </Grid>
                </label>
              </Box>
            </FormControl>
          </Box>
          <Box mt={16} textAlign="end">
            <Button colorScheme="blue">Simpan</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DataDiriPasien;
