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
  ButtonGroup,
  useToast,
  Divider,
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
import { Table, TableContainer, Td, Th, Tr } from '@chakra-ui/table';

import TableAdmin from '../components/TableAdmin';

function ResumeRawatJalan() {
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
  const patient_id = parseInt(patientId);

  const nama = location.state?.nama;
  const jenisKelamin = location.state?.jenisKelamin;
  const noHandphone = location.state?.noHandphone;
  const email = location.state?.email;
  const rumahSakit = location.state?.rumahSakit;
  const poliklinik = location.state?.poliklinik;
  const dokter = location.state?.dokter;
  const tanggalPeriksa = location.state?.tanggalPeriksa;
  const jamPeriksa = location.state?.jamPeriksa;

  console.log(location.state);
  const [reservationSelected, setReservationSelected] = useState();

  const date = new Date();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
  const [policlinics, setPoliclinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const day = date.getDate();
  const month = date.getMonth();
  const thisDay = date.getDate();
  const yy = date.getFullYear();

  const getPatientsByUserId = async () => {
    await api.getPatientByUserId(token, user.id).then((response) => {
      const data = response.data.data;
      setPatients(data);
    });
  };

  const getDetailHospitalHandler = async () => {
    await api
      .getHospitalByID(token, location.state?.hospital_id)
      .then((response) => {
        const data = response.data.data;
        console.log(response);
        setNameHospital(data.nama);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDoctorsByPoliclinic = async () => {
    await api
      .getAllDoctors(token)
      .then((response) => {
        const data = response.data.data;
        setDoctors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getReservationSelected = async () => {
    await api
      .getAllCheckUpReservations(token)
      .then((response) => {
        const data = response.data.data;
        setReservationSelected(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newDoctors = doctors.filter((data) => {
    return data.policlinic_id == policlinicId;
  });
  const getPatientById = async (id) => {
    await api.getPatientById(token, id).then((response) => {
      const data = response.data.data;
      setPatientSelected(data);
    });
  };

  const registrationPatient = async () => {
    await api.createBedRegistrations(token, { hospital_id, patient_id }).then((response) => {
      console.log(response);
    });
  };

  const handlerSelectPatient = () => {
    getPatientById(patientId);
    onClose();
  };

  const handlerRegistrasi = () => {
    console.log(hospital_id, patient_id);
    registrationPatient();
  };

  useEffect(() => {
    getPatientsByUserId();
    getDetailHospitalHandler();
    getReservationSelected();
  }, []);

  return (
    <Layout>
      <Box px={{ base: '5', sm: '10', xl: '36' }} py={10} my={10}>
        <Flex direction={{ base: 'column', xl: 'row' }} justifyContent={'center'}>
          <Box mr={{ base: '0', lg: '30px' }} className="basis-2/4">
            <Box borderWidth={'2px'} p="5" rounded={'10px'} mt={5} py="10">
              <Box>
                <Flex justifyContent={'center'} textAlign="center">
                  <Text fontSize={20} color="#072051" fontWeight={700}>
                    Resume Pendaftaran Online Rawat Jalan
                  </Text>
                </Flex>
              </Box>
              <Box mx={5} mt={10}>
                <Box mt={'5'} py={'10'} bg="white">
                  <Flex direction={{ base: 'column', lg: 'column', xl: 'row' }} justifyContent={'center'}>
                    <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                      <TableContainer variant="striped">
                        <Table>
                          <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                            <Tr>Nama</Tr>
                            <Tr>Jenis Kelamin</Tr>
                            <Tr>No Telepon</Tr>
                            <Tr>Email</Tr>
                            <Tr>Rumah Sakit</Tr>
                            <Tr>Poliklinik</Tr>
                            <Tr>Dokter Pilihan</Tr>
                            <Tr>Tanggal Periksa</Tr>
                            <Tr>Jam Periksa</Tr>
                          </Tr>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Box flexBasis={'45%'} pt={{ base: '5', xl: '0' }}>
                      <TableContainer>
                        <Table>
                          <Flex direction={{ base: 'column', lg: 'column', xl: 'row' }} justifyContent={'center'} textAlign="end">
                            <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                              <Tr textAlign={'end'}>{nama}</Tr>
                              <Tr textAlign={'end'}>{jenisKelamin}</Tr>
                              <Tr textAlign={'end'}>{noHandphone === '' ? 'Data Kosong' : noHandphone}</Tr>
                              <Tr textAlign={'end'}>{email}</Tr>
                              <Tr textAlign={'end'}>{rumahSakit}</Tr>
                              <Tr textAlign={'end'}>{poliklinik}</Tr>
                              <Tr textAlign={'end'}>{dokter}</Tr>
                              <Tr textAlign={'end'}>{tanggalPeriksa}</Tr>
                              <Tr textAlign={'end'}>{jamPeriksa}</Tr>
                            </Tr>
                          </Flex>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Flex>
                </Box>
                <Box mt={10} mb={20} textAlign={'center'}>
                  <Text mb={10}>Harap Datang 1 jam sebelum periksa</Text>
                  <Button bg="alta.primary" color="white" p={6} onClick={() => handlerRegistrasi()}>
                    Cetak
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default ResumeRawatJalan;
