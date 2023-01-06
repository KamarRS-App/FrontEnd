import React, { useEffect, useState } from "react";
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
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router";
import api from "../services/api";
import Cookies from "js-cookie";
import { AuthToken } from "../services/authToken";
import Loading from "../components/Loading";

function Pembayaran() {
  const auth = AuthToken();
  const location = useLocation();
  const token = Cookies.get('token');
  const hospital_id = parseInt(location.state?.hospital_id);
  const patient_id = parseInt(location.state?.patient_id);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState();
  const [hospital, setHospital] = useState();

  const date = new Date();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu'];

  const day = date.getDate();
  const month = date.getMonth();
  const thisDay = date.getDate();
  const yy = date.getFullYear();

  const getDetailHospitalHandler = async () => {
    await api.getHospitalByID(token, hospital_id)
      .then(response => {
        const data = response.data.data;
        setHospital(data);
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Gagal mandapatkan data Rumah Sakit',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
  }

  const getPatientById = async () => {
    await api.getPatientById(token, patient_id)
      .then(response => {
        const data = response.data.data;
        setPatient(data);
        // console.log(response)
        toast({
          position: 'top',
          title: 'Konfirmasi dan pastikan data yang kamu daftarkan sudah benar',
          status: 'warning',
          duration: '2000',
          isClosable: true
        });
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Gagal mendapatkan data pasien',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setLoading(false)
  }

  const registrationPatient = async () => {
    await api.createBedRegistrations(token, { hospital_id, patient_id })
      .then(response => {
        const data = response.data.data;
        toast({
          position: 'top',
          title: 'Berhasil mendaftarkan pasien',
          status: 'success',
          duration: '2000',
          isClosable: true
        });
        navigate('/registrasi/pembayaran');
        Cookies.set('kode_daftar', data.Kode_daftar);
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Gagal mendaftarkan pasien',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
  }

  const handlerPayment = () => {
    registrationPatient();
  }

  useEffect(() => {
    if (!auth) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true
      });
      navigate('/login');
    }
    getPatientById();
    getDetailHospitalHandler();
  }, []);

  return (
    <>
      {loading && <Loading body={'Tunggu Sebentar'} />}
      {
        !loading &&
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
                    </Flex>
                  </Box>
                  <Box mx={5} mt={10}>
                    <FormControl>
                      <Box>
                        <FormLabel>Nama Depan</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.nama_pasien} />
                      </Box>
                      <Box mt={5}>
                        <Flex>
                          <Box flexBasis={"45%"}>
                            <FormLabel>No. KTP</FormLabel>
                            <Input type="number" disabled _disabled={{ color: 'black' }} value={patient?.nik} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={"45%"}>
                            <FormLabel>No. BPJS</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.no_bpjs !== ' ' ? patient?.no_bpjs : 'Tidak terdaftar'} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <Flex>
                          <Box flexBasis={"45%"}>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.jenis_kelamin} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={"45%"}>
                            <FormLabel>Usia</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.usia + " tahun"} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <Flex>
                          <Box flexBasis={"45%"}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" disabled _disabled={{ color: 'black' }} value={patient?.email_wali} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={"45%"}>
                            <FormLabel>No. Handphone</FormLabel>
                            <Input type="number" disabled _disabled={{ color: 'black' }} value={patient?.no_telpon_wali} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <FormLabel>Alamat</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.alamat_ktp} />
                      </Box>
                      <Box mt={5}>
                        <Flex>
                          <Box flexBasis={"45%"}>
                            <FormLabel>Provinsi</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.provinsi_ktp} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={"45%"}>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.kabupaten_kota_ktp} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box mt={5}>
                        <FormLabel>Alamat Domisili</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.alamat_domisili} />
                      </Box>
                      <Box mt={5}>
                        <Flex>
                          <Box flexBasis={"45%"}>
                            <FormLabel>Provinsi</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.provinsi_domisili} />
                          </Box>
                          <Spacer />
                          <Box flexBasis={"45%"}>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <Input type="text" disabled _disabled={{ color: 'black' }} value={patient?.kabupaten_kota_domisili} />
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
                                {patient?.no_bpjs === undefined ? 'Gratis' : hospital?.biaya_registrasi}
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
                            <Text>{patient?.no_bpjs === undefined ? 'Gratis' : hospital?.biaya_registrasi}</Text>
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
                  <Box
                    textAlign={'end'}
                    my={'10'}
                  >
                    <Button
                      bg={'#3AB8FF'}
                      _hover={{ bg: 'alta.primary' }}
                      color={'white'}
                      p={6}
                      onClick={() => handlerPayment()}
                    >
                      Lanjutkan Pembayaran →
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box flexBasis={"30%"} pt={{ base: 5, lg: "0" }}>
                <Box borderWidth={"2px"} p="12" rounded={"10px"}>
                  <Text fontWeight={"semibold"} textAlign="center">
                    Pendaftaran Pasien <p>{hospital?.nama}</p>
                  </Text>
                  <Box borderTop={"1px"} mt={"5"} pt={"5"}>
                    <Flex justifyContent={"space-between"}>
                      <Text>Hari:</Text>
                      <Text>{myDays[thisDay - 1]}</Text>
                    </Flex>
                  </Box>
                  <Flex justifyContent={"space-between"} mt={5}>
                    <Text>Tanggal:</Text>
                    <Text>{`${day} ${months[month]} ${yy}`}</Text>
                  </Flex>
                  {/* <Flex justifyContent={"space-between"} mt={5}>
                <Text>Tipe Kamar:</Text>
                <Text>Kelas I</Text>
              </Flex> */}
                  <Flex justifyContent={"space-between"} mt={5}>
                    <Text>Rumah Sakit:</Text>
                    <Text>RS Haji Surabaya</Text>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Layout>
      }
    </>
  );
}

export default Pembayaran;
