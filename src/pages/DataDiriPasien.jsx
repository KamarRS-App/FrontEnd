import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import defaultProfile from "../assets/images/defaultProfile.png";
import { Link } from "@chakra-ui/react";
import Cookies from "js-cookie";
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
import axios from "axios";
import api from "../services/api";
import { Form } from "react-router-dom";

function DataDiriPasien() {
  const [provinsi, setProvinsi] = React.useState();
  const [kabupaten, setKabupaten] = React.useState(null);
  const [kabupatenKtp, setKabupatenKtp] = React.useState([]);
  //yup schema
  const schema = yup.object().shape({
    no_kartukeluarga: yup
      .number()
      .typeError("Harap masukkan nomor kartu keluarga"),
    no_kk: yup.number().typeError("Harap masukkan nomor kartu keluarga"),
    nik: yup.number().typeError("Harap masukkan Nomor Induk Kependudukan"),
    nama_pasien: yup.string().required("Harap masukkan nama pasien"),
    jenisKelamin: yup.string().required("Harap pilih salah satu jenis kelamin"),
    namaWali: yup.string().required("Harap masukkan nama wali"),
    emailWali: yup
      .string()
      .required("Harap masukkan email  wali")
      .email("Format email salah"),
    noKTP: yup.number().typeError("Harap masukkan nomor KTP").required(),
    noBPJS: yup.number().typeError("Harap masukkan nomor BPJS").required(),
    tanggalLahir: yup.string().nullable().required("Harap pilih tanggal lahir"),
    usia: yup.number().typeError("Harap masukkan usia").required(),
    noTelpWali: yup
      .number()
      .typeError("Harap masukkan nomor telpon wali")
      .required(),
    alamatKTP: yup.string().required("Harap masukkan alamat sesuai KTP"),
    nomorhape: yup.number().typeError("Harap masukkan nomor hp").required(),
    domisili: yup.string().required("Harap masukkan alamat domisili"),
    provinsi: yup.string().required("Harap pilih provinsi asal domisili"),
    kota: yup.string().required("Harap pilih kabupaten/kota asal domisili"),
    provinsi_ktp: yup.string().required("Harap pilih provinsi asal sesuai KTP"),
    kota_ktp: yup
      .string()
      .required("Harap pilih kabupaten/kota asal sesuai KTP"),
  });

  //rfh configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleReset = () => resetField("no_kk");

  //handle data provinsi
  const getProvinsi = async () => {
    await axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        setProvinsi(response.data.provinsi);
        console.log(response);
      });
  };

  //handle send data to database
  const handleSendData = async (data, cookies) => {
    await api
      .createPatient(cookies, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  //handle submit data
  const onSubmit = (data) => {
    const token = Cookies.get("token");
    console.log(token);
    console.log(data.file);
    // handleSendData(data, token);
  };

  React.useEffect(() => {
    getProvinsi();
  }, []);

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
                Hapus Pasien x
              </Button>
            </Box>
            <Box mt={20}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={10}
              >
                <GridItem>
                  <FormControl isInvalid={errors.no_kartukeluarga}>
                    <FormLabel>No. Kartu Keluarga</FormLabel>
                    <Input
                      {...register("no_kartukeluarga")}
                      type={"number"}
                      name={"no_kartukeluarga"}
                    />
                    <Text color={"red"}>
                      {errors.no_kartukeluarga?.message}
                    </Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.nik}>
                    <FormLabel>Nomor Induk Kependudukan</FormLabel>
                    <Input type={"number"} {...register("nik")} />
                    <Text color="red">{errors.nik?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.nama_pasien}>
                    <FormLabel>Nama Pasien:</FormLabel>
                    <Input name="nama_pasien" {...register("nama_pasien")} />
                    <Text color={"red"}>{errors.nama_pasien?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.jenisKelamin}>
                    <FormLabel>Jenis Kelamin:</FormLabel>
                    <Select
                      placeholder="-- Pilih Jenis Kelamin --"
                      name="jenisKelamin"
                      {...register("jenisKelamin")}
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Select>
                    <Text color={"red"}>{errors.jenisKelamin?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.tanggalLahir}>
                    <FormLabel>Tanggal Lahir:</FormLabel>
                    <Input
                      {...register("tanggalLahir")}
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      name={"tanggalLahir"}
                    />
                    <Text color="red">{errors.tanggalLahir?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.usia}>
                    <FormLabel>Usia:</FormLabel>
                    <Input type={"number"} name="usia" {...register("usia")} />
                    <Text color={"red"}>{errors.usia?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.namaWali}>
                    <FormLabel>Nama Wali</FormLabel>
                    <Input {...register("namaWali")} {...register("no_kk")} />
                    <Text color="red">{errors.namaWali?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.emailWali}>
                    <FormLabel>Email Wali</FormLabel>
                    <Input {...register("emailWali")} />
                    <Text color="red">{errors.emailWali?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.noTelpWali}>
                    <FormLabel>No. Telpon Wali</FormLabel>
                    <Input {...register("noTelpWali")} type="number" />
                    <Text color={"red"}>{errors.noTelpWali?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.alamatKTP}>
                    <FormLabel>Alamat KTP</FormLabel>
                    <Input {...register("alamatKTP")} type="text" />
                    <Text color="red">{errors.alamatKTP?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.provinsi_ktp}>
                    <FormLabel>Provinsi KTP</FormLabel>
                    <Select
                      {...register("provinsi_ktp")}
                      placeholder="-- Pilih provinsi --"
                      onChange={(e) => {
                        setKabupatenKtp(e.target.value);
                        console.log(kabupatenKtp);
                      }}
                    >
                      {provinsi?.map((prov) => {
                        return <option value={prov.id}>{prov.nama}</option>;
                      })}
                      {/* <option value="option1">Aceh</option>
                      <option value="papbaratdaya">Papua Barat Daya</option> */}
                    </Select>
                    <Text color={"red"}>{errors.provinsi_ktp?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.kota_ktp}>
                    <FormLabel>Kabupaten / Kota KTP</FormLabel>
                    <Select
                      {...register("kota_ktp")}
                      placeholder="-- Pilih kabupaten/kota --"
                      name="kota_ktp"
                    >
                      <option value="Kabupaten Pacitan">
                        Kabupaten Pacitan
                      </option>
                      <option value="Kabupaten Ponorogo">
                        Kabupaten Ponorogo
                      </option>
                      <option value="Kabupaten Trenggalek">
                        Kabupaten Trenggalek
                      </option>
                      <option value="Kabupaten Tulungagung">
                        Kabupaten Tulungagung
                      </option>
                      <option value="Kabupaten Blitar">Kabupaten Blitar</option>
                      <option value="Kabupaten Kediri">Kabupaten Kediri</option>
                      <option value="Kabupaten Malang">Kabupaten Malang</option>
                      <option value="Kabupaten Lumajang">
                        Kabupaten Lumajang
                      </option>
                      <option value="Kabupaten Jember">Kabupaten Jember</option>
                      <option value="Kabupaten Banyuwangi">
                        Kabupaten Banyuwangi
                      </option>
                      <option value="Kabupaten Bondowoso">
                        Kabupaten Bondowoso
                      </option>
                      <option value="Kabupaten Situbondo">
                        Kabupaten Situbondo
                      </option>
                      <option value="Kabupaten Probolinggo">
                        Kabupaten Probolinggo
                      </option>
                      <option value="Kabupaten Pasuruan">
                        Kabupaten Pasuruan
                      </option>
                      <option value="Kabupaten Sidoarjo">
                        Kabupaten Sidoarjo
                      </option>
                      <option value="Kabupaten Mojokerto">
                        Kabupaten Mojokerto
                      </option>
                      <option value="Kabupaten Jombang">
                        Kabupaten Jombang
                      </option>
                    </Select>
                    <Text color={"red"}>{errors.kota_ktp?.message}</Text>
                  </FormControl>
                </GridItem>
                <Box>
                  <FormControl isInvalid={errors.domisili}>
                    <FormLabel>Alamat Domisili</FormLabel>
                    <Input {...register("domisili")} />
                    <Text color={"red"}>{errors.domisili?.message}</Text>
                  </FormControl>
                </Box>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.provinsi}>
                    <FormLabel>Provinsi Domisili</FormLabel>
                    <Select
                      {...register("provinsi")}
                      placeholder="-- Pilih provinsi --"
                      onChange={(e) => setKabupaten(e.target.value)}
                    >
                      {provinsi?.map((prov) => {
                        return <option value={prov.id}>{prov.nama}</option>;
                      })}
                      {/* <option value="option1">Aceh</option>
                      <option value="papbaratdaya">Papua Barat Daya</option> */}
                    </Select>
                    <Text color={"red"}>{errors.provinsi?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.kota}>
                    <FormLabel>Kabupaten / Kota Domisili</FormLabel>
                    <Select
                      {...register("kota")}
                      placeholder="-- Pilih kabupaten/kota --"
                    >
                      <option value="Kabupaten Pacitan">
                        Kabupaten Pacitan
                      </option>
                      <option value="Kabupaten Ponorogo">
                        Kabupaten Ponorogo
                      </option>
                      <option value="Kabupaten Trenggalek">
                        Kabupaten Trenggalek
                      </option>
                      <option value="Kabupaten Tulungagung">
                        Kabupaten Tulungagung
                      </option>
                      <option value="Kabupaten Blitar">Kabupaten Blitar</option>
                      <option value="Kabupaten Kediri">Kabupaten Kediri</option>
                      <option value="Kabupaten Malang">Kabupaten Malang</option>
                      <option value="Kabupaten Lumajang">
                        Kabupaten Lumajang
                      </option>
                      <option value="Kabupaten Jember">Kabupaten Jember</option>
                      <option value="Kabupaten Banyuwangi">
                        Kabupaten Banyuwangi
                      </option>
                      <option value="Kabupaten Bondowoso">
                        Kabupaten Bondowoso
                      </option>
                      <option value="Kabupaten Situbondo">
                        Kabupaten Situbondo
                      </option>
                      <option value="Kabupaten Probolinggo">
                        Kabupaten Probolinggo
                      </option>
                      <option value="Kabupaten Pasuruan">
                        Kabupaten Pasuruan
                      </option>
                      <option value="Kabupaten Sidoarjo">
                        Kabupaten Sidoarjo
                      </option>
                      <option value="Kabupaten Mojokerto">
                        Kabupaten Mojokerto
                      </option>
                      <option value="Kabupaten Jombang">
                        Kabupaten Jombang
                      </option>
                    </Select>
                    <Text color={"red"}>{errors.kota?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.noBPJS}>
                    <FormLabel>No. BPJS</FormLabel>
                    <Input {...register("noBPJS")} type="number" />
                    <Text color="red">{errors.noBPJS?.message}</Text>
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
                  {...register("file", { required: "Harap masukkan file" })}
                  type="file"
                  id="img"
                  name="file"
                  accept="image/*"
                  display={"none"}
                />
                <Box h={300} borderWidth="1px" rounded={10} w="100%">
                  <FormControl isInvalid={error.file}>
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
                          Jenis file yang didukung: JPEG, PNG
                        </Text>
                      </Grid>
                    </label>
                  </FormControl>
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
