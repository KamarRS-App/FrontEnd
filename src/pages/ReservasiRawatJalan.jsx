import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
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
  useToast,
  Select,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import api from '../services/api';

function ReservasiRawatJalan() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get('token');
  const user = useSelector((state) => state.users);
  const toast = useToast();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState();

  const [patientSelected, setPatientSelected] = useState();
  const location = useLocation();
  const [nameHospital, setNameHospital] = useState();
  const idHospital = parseInt(location.state?.idHospital);
  const idDoctor = parseInt(location.state?.idDoctor);
  const idPoliclinic = parseInt(location.state?.idPoliclinic);
  const practiceId = parseInt(location.state?.practiceId);
  const [policlinicName, setPoliclinicName] = useState();
  const [doctorName, setDoctorName] = useState();
  const [timeSelected, setTimeSelected] = useState();
  const time = location.state?.time;

  const date = new Date();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];

  const day = date.getDate();
  const month = date.getMonth();
  const thisDay = date.getDate();
  const yy = date.getFullYear();

  const inDate = `${day} ${months[month]} ${yy}`;
  const getPatientsByUserId = async () => {
    await api.getPatientByUserId(token, user.id).then((response) => {
      const data = response.data.data;
      setPatients(data);
    });
  };
  //handle send data to database
  const handleSendData = async (patient_id, practice_id) => {
    await api
      .createCheckUpReservation(token, { patient_id, practice_id })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const getHospitalSelected = async () => {
    await api
      .getHospitalByID(token, location.state?.idHospital)
      .then((response) => {
        const data = response.data.data;
        // console.log(response);
        setNameHospital(data.nama);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPoliclinicSelected = async () => {
    await api
      .getPoliclinicById(token, location.state?.idPoliclinic)
      .then((response) => {
        const data = response.data.data;
        // console.log(response);
        setPoliclinicName(data.nama_poli);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDoctorSelected = async () => {
    await api
      .getDoctorById(token, location.state?.idDokter)
      .then((response) => {
        const data = response.data.data;
        // console.log(response);
        setDoctorName(data.nama);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTimeSelected = async () => {
    await api
      .getPoliclinicById(token, location.state?.time)
      .then((response) => {
        const data = response.data.data;
        // console.log(response);
        setTimeSelected(data.jam_praktik);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(location.state?.idHospital);
  // console.log(location.state?.idPoliclinic);
  // console.log(location.state?.idDokter);
  // console.log(location.state?.time);

  const getPatientById = async (id) => {
    await api
      .getPatientById(token, id)
      .then((response) => {
        const data = response.data.data;
        setPatientSelected(data);
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Gagal mendapatkan data pasien',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
  };

  const registrationPatient = async () => {
    await api
      .createBedRegistrations(token, { hospital_id, patient_id })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: 'top',
          title: 'Gagal mendaftarkan pasien',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
  };

  const handlerSelectPatient = () => {
    getPatientById(patientId);
    onClose();
  };
  const handlerRegistrasi = () => {
    const patient_id = parseInt(patientId);
    handleSendData(patient_id, practiceId);
    console.log(typeof patient_id);

    // navigate('/resume/rawat/jalan', {
    //   state: {
    //     nama: patientSelected?.nama_pasien,
    //     jenisKelamin: patientSelected?.jenis_kelamin,
    //     noHandphone: patientSelected?.no_telpon_wali,
    //     email: patientSelected?.email_wali,
    //     rumahSakit: nameHospital,
    //     poliklinik: policlinicName,
    //     dokter: doctorName,
    //     tanggalPeriksa: inDate,
    //     jamPeriksa: location.state?.time,
    //   },
    // });
  };

  useEffect(() => {
    if (!token) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true,
      });
      navigate('/login');
    }
    getPatientsByUserId();
    getHospitalSelected();
    getPoliclinicSelected();
    getDoctorSelected();
    getTimeSelected();
  }, []);

  return (
    <Layout>
      <Box px={{ base: '5', sm: '10', xl: '36' }} py={10} my={10}>
        <Flex direction={{ base: 'column', xl: 'row' }}>
          <Box mr={{ base: '0', lg: '30px' }} className="basis-3/4">
            <Box borderWidth={'2px'} p="5" rounded={'10px'}>
              <Text fontWeight={'semibold'}>Login sebagai</Text>
              <Text color={'gray'}>{user.nama}</Text>
            </Box>
            <Box borderWidth={'2px'} p="5" rounded={'10px'} mt={5} py="10">
              <Box>
                <Flex justifyContent={'space-between'}>
                  <Text fontWeight={'semibold'}>Data Pemesan</Text>
                </Flex>
              </Box>
              <Box mx={5} mt={10}>
                <FormControl>
                  <Box>
                    <Flex direction={{ base: 'column', xl: 'row' }}>
                      <Box flexBasis={'100%'}>
                        <FormLabel>Nama Pemesan</FormLabel>
                        <Input type="text" disabled value={user.nama} _disabled={{ color: 'black' }} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex direction={{ base: 'column', xl: 'row' }}>
                      <Box flexBasis={'45%'}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" disabled value={user.email} _disabled={{ color: 'black' }} />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                        <FormLabel>No. Handphone</FormLabel>
                        <Input type="string" _disabled={{ color: 'black' }} disabled value={user.no_telpon ? user.no_telpon : 'tidak ada'} />
                      </Box>
                    </Flex>
                  </Box>
                </FormControl>
              </Box>
            </Box>
            <Box borderWidth={'2px'} p="5" rounded={'10px'} mt={5} py="10">
              <Box>
                <Flex justifyContent={'space-between'}>
                  <Text fontWeight={'semibold'}>Detail Pasien</Text>
                  <Button onClick={onOpen} bg={'#3AB8FF'} _hover={{ bg: 'alta.primary' }} color={'white'}>
                    Pilih Data Pasien
                  </Button>
                </Flex>
              </Box>
              <Box mx={5} mt={10}>
                <FormControl>
                  <Box>
                    <FormLabel>Nama Depan</FormLabel>
                    <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.nama_pasien} />
                  </Box>
                  <Box mt={5}>
                    <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                      <Box flexBasis={'45%'}>
                        <FormLabel>No. KTP</FormLabel>
                        <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.nik} />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                        <FormLabel>No. BPJS</FormLabel>
                        <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.no_bpjs} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                      <Box flexBasis={'45%'}>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.jenis_kelamin} />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                        <FormLabel>Usia</FormLabel>
                        <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.usia} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                      <Box flexBasis={'45%'}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" disabled _disabled={{ color: 'black' }} value={patientSelected?.email_wali} />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                        <FormLabel>No. Handphone Wali</FormLabel>
                        <Input type="number" disabled _disabled={{ color: 'black' }} value={patientSelected?.no_telpon_wali} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={5}>
                    <FormLabel>Alamat Domisili</FormLabel>
                    <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.alamat_domisili} />
                  </Box>
                  <Box mt={5}>
                    <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
                      <Box flexBasis={'45%'}>
                        <FormLabel>Provinsi</FormLabel>
                        <Input type="text" disabled _disabled={{ color: 'black' }} value={patientSelected?.provinsi_domisili} />
                      </Box>
                      <Spacer />
                      <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                        <FormLabel>Kabupaten / Kota</FormLabel>
                        <Input type="string" disabled _disabled={{ color: 'black' }} value={patientSelected?.kabupaten_kota_domisili} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box mt={10}>
                    <Checkbox defaultChecked>Semua data telah terisi dengan sebenar-benarnya</Checkbox>
                  </Box>
                </FormControl>
              </Box>
            </Box>
            <Box mt={10} mb={20} textAlign={'end'}>
              <Button bg={patientId ? '#3AB8FF' : '#f7f7f7'} _hover={{ bg: 'alta.primary' }} color={patientId ? 'white' : '#15192080'} p={6} onClick={() => handlerRegistrasi()} disabled={patientId ? false : true}>
                Selesaikan Pendaftaran →
              </Button>
            </Box>
          </Box>
          <Box>
            <Box borderWidth={'2px'} p="12" rounded={'10px'}>
              <Text fontWeight={700} fontSize={16} color="#072051" textAlign="center">
                Resume Pendaftaran Online Rawat Jalan
              </Text>

              <Box borderTop={'1px'} mt={'5'} pt={'5'}>
                <Flex justifyContent={'space-between'}>
                  <Text>Hari:</Text>
                  <Text>{myDays[thisDay - 1]}</Text>
                </Flex>
              </Box>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Tanggal:</Text>
                <Text>{day + ' ' + months[month] + ' ' + yy}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Jam Periksa:</Text>
                <Text>{location.state?.time}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Rumah Sakit:</Text>
                <Text>{nameHospital}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Poliklinik:</Text>
                <Text>{policlinicName}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} mt={5}>
                <Text>Dokter:</Text>
                <Text>{doctorName}</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>

      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Pasien</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Pasien Terdaftar pada Akun</FormLabel>
              <Select placeholder="Pilih Pasien" id="patient" onChange={(e) => setPatientId(e.target.value)}>
                {patients?.map((data, index) => (
                  <option value={data.id} key={index}>
                    {data.nama_pasien}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handlerSelectPatient()} bg={'#3AB8FF'} _hover={{ bg: 'alta.primary' }} color={'white'}>
              Pilih
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

export default ReservasiRawatJalan;
