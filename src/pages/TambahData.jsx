import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Group3601 from "../assets/images/Group3601.png";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Cookies from "js-cookie";
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

function TambahData() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users);
  const token = Cookies.get('token');
  const toast = useToast();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPatientsByUserId = async () => {
    await api.getPatientByUserId(token, user.id)
      .then(response => {
        const data = response.data.data;
        setPatients(data);
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Gagal Mendapatkan data pasien terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setLoading(false);
  }

  useEffect(() => {
    if (!token) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true
      });
      navigate('/login');
    }
    getPatientsByUserId();
  }, []);

  return (
    <>
      {loading && <Loading body={'Sedang Memuat Halaman....'} />}
      {
        !loading &&
        <Layout>
          <Box minH="100vh" backgroundColor="white">
            <Box px={36} py={20} w="100%">
              <Box className="text-end">
                <Button
                  bg="#3AB8FF"
                  _hover={{ bg: "alta.primary" }}
                  color="white"
                  onClick={() => navigate("/pasien/tambah")}
                >
                  Tambah data +
                </Button>
              </Box>
              <Box pt={20} className="text-center">
                {
                  patients.length === 0 ?
                    <>
                      <Text color="gray" fontSize="3xl">
                        belum ada data terdaftar
                      </Text>
                      <Box pt={10}>
                        <Grid className="justify-center">
                          <Image src={Group3601} alt="Belum ada data" />
                        </Grid>
                      </Box>
                    </>
                    :
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th color="alta.primary">Aksi</Th>
                            <Th color="alta.primary">No</Th>
                            <Th color="alta.primary">Nama</Th>
                            <Th color="alta.primary">NIK</Th>
                            <Th color="alta.primary">No KK</Th>
                            <Th color="alta.primary">Usia</Th>
                            <Th color="alta.primary">Alamat</Th>
                            <Th color="alta.primary">Jenis Kelamin</Th>
                            <Th color="alta.primary">Nama Wali</Th>
                            <Th color="alta.primary">Email Wali</Th>
                            <Th color="alta.primary">No Telpon Wali</Th>
                            <Th color="alta.primary">No BPJS</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {
                            patients?.map((patient, index) => (
                              <Tr key={index}>
                                <Td
                                  textAlign={'center'}
                                >
                                  <ButtonGroup gap='4'>
                                    <Button
                                      // onClick={() => onHandlerEdit(data.id)}
                                      bg='transparent'
                                      border='1px'
                                      borderColor={'#E0E0E0'}
                                    >
                                      <MdModeEdit />
                                    </Button>
                                    <Button
                                      // onClick={() => onDeleteClicked(data.id)}
                                      bg='transparent'
                                      border='1px'
                                      borderColor={'#E0E0E0'}
                                    >
                                      <MdOutlineDeleteOutline />
                                    </Button>
                                  </ButtonGroup>
                                </Td>
                                <Td>{index + 1}</Td>
                                <Td>{patient.nama_pasien}</Td>
                                <Td>{patient.nik}</Td>
                                <Td>{patient.no_kk}</Td>
                                <Td>{patient.usia} Tahun</Td>
                                <Td>{patient.alamat_domisili + ", " + patient.kabupaten_kota_domisili + ", " + patient.provinsi_domisili}</Td>
                                <Td>{patient.jenis_kelamin}</Td>
                                <Td>{patient.nama_wali}</Td>
                                <Td>{patient.email_wali}</Td>
                                <Td>{patient.no_telpon_wali === '' ? 'tidak ada' : patient.no_telpon_wali}</Td>
                                <Td>{patient.no_bpjs === '' ? 'tidak ada' : patient.no_bpjs}</Td>
                              </Tr>
                            ))
                          }
                        </Tbody>
                      </Table>
                    </TableContainer>
                }
              </Box>
            </Box>
          </Box>
        </Layout>
      }
    </>
  );
}

export default TambahData;
