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
import Layout from "../components/Layout";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "daisyui/src/colors";

const schema = yup.object().shape({
  namaDepan: yup.string().required("Harap masukkan nama depan"),
  namaBelakang: yup.string().required("Harap masukkan nama belakang"),
  noKTP: yup.number().typeError("Harap masukkan nomor KTP").required(),
  noBPJS: yup.number().typeError("Harap masukkan nomor BPJS").required(),
  jenisKelamin: yup.string().required("Harap pilih satu jenis kelamin"),
  usia: yup
    .number()
    .typeError("Harap masukkan usia")
    .positive("Usia haruslah bilangan positif"),
  email: yup.string().required("Harap isi email").email("Format email salah"),
  nomorhape: yup.number().typeError("Harap masukkan nomor hp").required(),
  domisili: yup.string().required("Harap masukkan alamat domisili"),
  provinsi: yup.string().required("Harap pilih provinsi asal"),
  kota: yup.string().required("Harap pilih kabupaten/kota asal"),
  riwayat: yup.string().required("Harap masukkan riwayat penyakit pasien"),
  fotoKTP: yup
    .mixed()
    .required("Harap upload foto KTP")
    .test(
      "fileSize",
      "Ukuran file terlalu besar, max 10MB",
      (value) => value && value.size <= 100 * 1024
    )
    .test(
      "fileFormat",
      "Format file tidak didukung",
      (value) => value && ["image/jpg", "image/jpeg"].includes(value.type)
    ),
});

function DataDiriPasien() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Layout>
      <Box w="full" h="full" color="black">
        <Box w="full">
          <Box p="20">
            <Text fontSize="2xl" color="alta.primary" className="font-semibold">
              Data Diri Pasien
            </Text>
            <Box textAlign={{ base: "start", md: "end" }} pt={10}>
              <Button
                bg="#3AB8FF"
                _hover={{ bg: "alta.primary" }}
                color="white"
              >
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
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={10}
              >
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Nama Depan:</FormLabel>
                    <Input name="namaDepan" {...register("namaDepan")} />
                    <Text color={"red"}>{errors.namaDepan?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Nama Belakang</FormLabel>
                    <Input {...register("namaBelakang")} />
                    <Text color="red">{errors.namaBelakang?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>No. KTP</FormLabel>
                    <Input {...register("noKTP")} type="number" />
                    <Text color="red">{errors.noKTP?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>No BPJS</FormLabel>
                    <Input {...register("noBPJS")} type="number" />
                    <Text color="red">{errors.noBPJS?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      {...register("jenisKelamin")}
                      placeholder="-- Pilih jenis kelamin --"
                    >
                      <option value="option1">Laki-laki</option>
                      <option value="option2">Perempuan</option>
                    </Select>
                    <Text color="red">{errors.jenisKelamin?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Usia</FormLabel>
                    <Input {...register("usia")} type="number" />
                    <Text color="red">{errors.usia?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input {...register("email")} />
                    <Text color="red">{errors.email?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>No Handphone</FormLabel>
                    <Input {...register("nomorhape")} type="number" />
                    <Text color={"red"}>{errors.nomorhape?.message}</Text>
                  </FormControl>
                </GridItem>
              </Grid>
              <Box mt="10">
                <FormControl isRequired>
                  <FormLabel>Alamat Domisili</FormLabel>
                  <Input {...register("domisili")} />
                  <Text color={"red"}>{errors.domisili?.message}</Text>
                </FormControl>
              </Box>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={10}
                mt="10"
              >
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Provinsi</FormLabel>
                    <Select
                      {...register("provinsi")}
                      placeholder="-- Pilih provinsi --"
                    >
                      <option value="option1">Aceh</option>
                      <option value="papbaratdaya">Papua Barat Daya</option>
                    </Select>
                    <Text color={"red"}>{errors.provinsi?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Kabupaten / Kota</FormLabel>
                    <Select
                      {...register("kota")}
                      placeholder="-- Pilih kabupaten/kota --"
                    >
                      <option value="papbaratdaya">Papua Barat Daya</option>
                    </Select>
                    <Text color={"red"}>{errors.kota?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isRequired>
                    <FormLabel>Riwayat Penyakit</FormLabel>
                    <Input {...register("riwayat")} />
                    <Text color={"red"}>{errors.riwayat?.message}</Text>
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
                <Text>{error.fotoKTP?.message}</Text>
                <Input
                  {...register("fotoKTP")}
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
                      <Text color={"#676767"}>
                        Supported formates: JPEG, PNG
                      </Text>
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
                      <Text color={"#676767"}>
                        Supported formates: JPEG, PNG
                      </Text>
                    </Grid>
                  </label>
                </Box>
              </FormControl>
            </Box>
            <Box mt={16} textAlign="end">
              <Button
                bg="#3AB8FF"
                color="white"
                _hover={{ bg: "alta.primary" }}
                onClick={handleSubmit(onSubmit)}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default DataDiriPasien;
