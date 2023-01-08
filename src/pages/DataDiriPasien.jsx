import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Cookies from "js-cookie";
import {
  FormControl,
  FormLabel,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import UploadIcon from "../assets/images/UploadIcon.png";
import Layout from "../components/Layout";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import api from "../services/api";
import { BsFillTrashFill } from "react-icons/bs";
import apiProvinsi from "../services/apiProvinsi";

function DataDiriPasien() {
  const [provinsi, setProvinsi] = React.useState([]);
  const [provinsiDomisili, setProvinsiDomisili] = React.useState([]);
  const [kabupaten, setKabupaten] = React.useState([]);
  const [kabupatenDomisili, setKabupatenDomilisi] = React.useState([]);
  const [noKK, setNoKk] = React.useState();
  const [anggotaBpjs, setAnggotaBpjs] = React.useState(false);
  const [previewImageKTP, setPreviewImageKtp] = React.useState();
  const [imageKtp, setImageKtp] = React.useState();
  const [previewImageBpjs, setPreviewImageBpjs] = React.useState();
  const [imageBpjs, setImageBpjs] = React.useState();
  const toast = useToast();
  const [nameProv, setNameProv] = React.useState();
  const [nameProvDomisili, setNameProvDomisili] = React.useState();

  //yup schema
  const schema = yup.object().shape({
    nik: yup.number().typeError("Harap masukkan Nomor Induk Kependudukan"),
    nama_pasien: yup.string().required("Harap masukkan nama pasien"),
    jenisKelamin: yup.string().required("Harap pilih salah satu jenis kelamin"),
    namaWali: yup.string().required("Harap masukkan nama wali"),
    tanggalLahir: yup.string().required("Harap masukkan tanggal lahir"),
    emailWali: yup
      .string()
      .required("Harap masukkan email  wali")
      .email("Format email salah"),
    noKTP: yup.number().typeError("Harap masukkan nomor KTP"),
    usia: yup.number().typeError("Harap masukkan usia"),
    noTelpWali: yup.number().typeError("Harap masukkan nomor telpon wali"),
    alamatKTP: yup.string().required("Harap masukkan alamat sesuai KTP"),
    nomorhape: yup.number().typeError("Harap masukkan nomor hp"),
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
    mode: "onSubmit",
  });

  //region api
  const getProvinsi = async () => {
    await apiProvinsi.getProvinsi()
      .then((response) => {
        const data = response.data.value
        setProvinsi(data);
      });
  };

  const getKotaKabupatenByProvinsi = async (id) => {
    await apiProvinsi.getKotaKabupateByProvinsi(id)
      .then(response => {
        const data = response.data.value;
        setKabupaten(data);
      })
  }

  //handle send data to database
  const handleSendData = async (token, data) => {
    await api
      .createPatient(token, data)
      .then((response) => {
        console.log(response);
        toast({
          position: "top",
          title: "Berhasil menambahkan data pasien",
          status: "success",
          duration: "2000",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top",
          title: "Ini terjadi karna kesalahan kami, mohon tunggu..",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  //get kartu keluarga
  const getNomorKk = async () => {
    const token = Cookies.get("token");
    await api
      .getUser(token)
      .then((response) => {
        setNoKk(response.data.data.no_kk);
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Terjadi kesalahan, silahkan hubungi administrator",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  //============= IMAGE PREVIEW ==============
  const handleFileKtp = (file) => {
    setImageKtp(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImageKtp(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileBpjs = (file) => {
    setImageBpjs(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImageBpjs(reader.result);
    };
    reader.readAsDataURL(file);
  };


  //handler select
  const selectNameProvinsi = (id) => {
    provinsi.filter((data) => {
      return data.id === id && setNameProv(data.name);
    })
  }

  const handlerChangeProvinsi = (id) => {
    selectNameProvinsi(id);
    getKotaKabupatenByProvinsi(id);
  }

  const selectNameProvinsiDomisili = (id) => {
    provinsi.filter((data) => {
      return data.id === id && setNameProvDomisili(data.name);
    })
  }

  const handlerChangeProvinsiDomisili = (id) => {
    selectNameProvinsiDomisili(id);
    getKotaKabupatenByProvinsi(id);
  }

  //handle submit data
  const onSubmit = (data) => {
    const ngab = Cookies.get("token");
    const formData = new FormData();
    formData.append("no_kk", noKK);
    formData.append("nik", data.nik);
    formData.append("nama_pasien", data.nama_pasien);
    formData.append("jenis_kelamin", data.jenisKelamin);
    formData.append("tanggal_lahir", data.tanggalLahir);
    formData.append("usia", data.usia);
    formData.append("nama_wali", data.namaWali);
    formData.append("email_wali", data.emailWali);
    formData.append("no_telpon_wali", data.noTelpWali);
    formData.append("alamat_ktp", data.alamatKTP);
    formData.append("kabupaten_kota_ktp", data.kota_ktp);
    formData.append("alamat_domisili", data.domisili);
    formData.append("provinsi_domisili", nameProvDomisili);
    formData.append("provinsi_ktp", nameProv);
    formData.append("kabupaten_kota_domisili", data.kota);
    if (anggotaBpjs) {
      formData.append("no_bpjs", data.noBPJS);
      formData.append("kelas_bpjs", data.kelas_bpjs);
    }
    formData.append("foto_ktp", imageKtp);
    formData.append("foto_bpjs", imageBpjs);
    handleSendData(ngab, formData);
  };

  React.useEffect(() => {
    getProvinsi();
    getNomorKk();
  }, []);

  return (
    <Layout>
      <Box w="full" h="full" color="black">
        <Box w="full">
          <Box p="20">
            <Text fontSize="2xl" color="alta.primary" className="font-semibold">
              Data Diri Pasien
            </Text>
            <Box mt={20}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={10}
              >
                <GridItem>
                  <FormControl isInvalid={errors.no_kk}>
                    <FormLabel>No. Kartu Keluarga</FormLabel>
                    <Input
                      {...register("no_kk")}
                      type={"number"}
                      name={"no_kk"}
                      value={noKK}
                    />
                    <Text color={"red"}>{errors.no_kk?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.nik}>
                    <FormLabel>Nomor Induk Kependudukan</FormLabel>
                    <Input {...register("nik")} type={"number"} />
                    <Text color="red">{errors.nik?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.nama_pasien}>
                    <FormLabel>Nama Pasien:</FormLabel>
                    <Input
                      {...register("nama_pasien")}
                      type={"string"}
                      name="nama_pasien"
                    />
                    <Text color={"red"}>{errors.nama_pasien?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.jenisKelamin}>
                    <FormLabel>Jenis Kelamin:</FormLabel>
                    <Select
                      {...register("jenisKelamin")}
                      placeholder="-- Pilih Jenis Kelamin --"
                      name="jenisKelamin"
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
                    <Input {...register("namaWali")} />
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
                        handlerChangeProvinsi(e.target.value);
                      }}
                    >
                      {provinsi.map((prov) => {
                        return <option value={prov.id}>{prov.name}</option>;
                      })}
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
                      {
                        kabupaten.map(data => (
                          <option value={data.name}>{data.name}</option>
                        ))
                      }
                    </Select>
                    <Text color={"red"}>{errors.kota_ktp?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.provinsi}>
                    <FormLabel>Provinsi Domisili</FormLabel>
                    <Select
                      {...register("provinsi")}
                      placeholder="-- Pilih provinsi --"
                      onChange={(e) => handlerChangeProvinsiDomisili(e.target.value)}
                    >
                      {provinsi?.map((prov) => {
                        return <option value={prov.id}>{prov.name}</option>;
                      })}
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
                      name={"kota"}
                    >
                      {
                        kabupaten.map(data => (
                          <option value={data.name}>{data.name}</option>
                        ))
                      }
                    </Select>
                    <Text color={"red"}>{errors.kota?.message}</Text>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
            <Box mt={5}>
              <FormControl isInvalid={errors.domisili}>
                <FormLabel>Alamat Domisili</FormLabel>
                <Input {...register("domisili")} />
                <Text color={"red"}>{errors.domisili?.message}</Text>
              </FormControl>
            </Box>
            <Box mt={5}>
              <Checkbox onChange={() => setAnggotaBpjs(!anggotaBpjs)} mb={2}>
                Daftar Menggunakan BPJS
              </Checkbox>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={10}
              >
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.noBPJS}>
                    <FormLabel>No. BPJS</FormLabel>
                    <Input
                      {...register("noBPJS")}
                      type="number"
                      isDisabled={anggotaBpjs}
                    />
                    <Text color="red">{errors.noBPJS?.message}</Text>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <FormControl isInvalid={errors.kelas_bpjs}>
                    <FormLabel>Kelas BPJS</FormLabel>
                    <Input
                      {...register("kelas_bpjs")}
                      type="number"
                      isDisabled={anggotaBpjs}
                    />
                    <Text color="red">{errors.kelas_bpjs?.message}</Text>
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
                {previewImageKTP ? (
                  <>
                    <Box>
                      <Button
                        onClick={() => setPreviewImageKtp(null)}
                        bg="#3AB8FF"
                        _hover={{ bg: "alta.primary" }}
                        color="white"
                      >
                        Remove Image
                        <BsFillTrashFill />
                      </Button>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
                <Input
                  // {...register("fotoKTP")}
                  type="file"
                  id="img"
                  name="fotoKTP"
                  accept="image/*"
                  display={"none"}
                  onChange={(e) => handleFileKtp(e.target.files[0])}
                />
                <Box h={400} borderWidth="1px" rounded={10} w="100%" mt={5}>
                  <FormControl>
                    <label for="img" style={{ cursor: "pointer" }}>
                      <Grid
                        justifyContent={"center"}
                        alignItems="center"
                        w="100%"
                        textAlign={"center"}
                      >
                        {previewImageKTP ? (
                          <>
                            <Box w={"100%"} h={"100%"} pt={10}>
                              <Image
                                src={previewImageKTP}
                                w={"300px"}
                                h={"300px"}
                              />
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box className="grid justify-center" pt={10}>
                              <Image
                                src={UploadIcon}
                                w="50px"
                                mt={20}
                                textAlign="center"
                              />
                            </Box>
                            <Text fontSize={"2xl"}>
                              Upload file kamu{" "}
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
                          </>
                        )}
                      </Grid>
                    </label>
                  </FormControl>
                </Box>
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>Foto Kartu BPJS</FormLabel>
                {previewImageBpjs ? (
                  <>
                    <Box>
                      <Button
                        onClick={() => setPreviewImageBpjs(null)}
                        bg="#3AB8FF"
                        _hover={{ bg: "alta.primary" }}
                        color="white"
                      >
                        Remove Image
                        <BsFillTrashFill />
                      </Button>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
                <Input
                  // {...register("fotoBPJS")}
                  type="file"
                  id="bpjs"
                  name="fotoBPJS"
                  accept="image/*"
                  display={"none"}
                  onChange={(e) => handleFileBpjs(e.target.files[0])}
                />
                <Box h={400} borderWidth="1px" rounded={10} w="100%" mt={5}>
                  <label for="bpjs" style={{ cursor: "pointer" }}>
                    <Grid
                      justifyContent={"center"}
                      alignItems="center"
                      w="100%"
                      textAlign={"center"}
                    >
                      {previewImageBpjs ? (
                        <>
                          <Box w={"100%"} h={"100%"} pt={10}>
                            <Image
                              src={previewImageBpjs}
                              w={"300px"}
                              h={"300px"}
                            />
                          </Box>
                        </>
                      ) : (
                        <>
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
                                for="bpjs"
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
                        </>
                      )}
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
