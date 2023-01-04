import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Group3601 from "../assets/images/Group3601.png";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Cookies from "js-cookie";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import PopupAdmin from "../components/PopupAdmin";

function TambahData() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users);
  const token = Cookies.get("token");
  const toast = useToast();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPatientsByUserId = async () => {
    await api
      .getPatientByUserId(token, user.id)
      .then((response) => {
        const data = response.data.data;
        setPatients(data);
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Ini terjadi karna kesalahan kami, mohon tunggu..',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setLoading(false);
  };

  //delete user by id handler
  const deletePatientById = async (token, id) => {
    await api
      .deletePatient(token, id)
      .then((response) => {
        toast({
          title: `Berhasil menghapus data pasien`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((err) => {
        toast({
          title: `Gagal menghapus data pasien, silahkan hubungi administrator`,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      });
  };

  //change user by id
  const editUserById = async (e, token, id, data) => {
    e.preventDefault();
    await api
      .updatePatient(token, id, data)
      .then((response) => {
        toast({
          title: `Berhasil mengubah data pasien`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((err) => {
        toast({
          title: `Gagal mengubah data pasian, silahkan hubungi administrator.`,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      });
  };

  //input changes handler
  const handlerChangeInput = (e) => {
    const newData = { ...modalData };
    newData[e.target.id] = e.target.value;
    setModalData(newData);
  };

  useEffect(() => {
    getPatientsByUserId();
  }, [patients]);

  useEffect(() => {
    if (!token) {
      toast({
        position: "top",
        title: "Kamu Harus Login Dulu",
        status: "warning",
        duration: "2000",
        isClosable: true,
      });
      navigate("/login");
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
                                  <ButtonGroup gap="4">
                            <Button
                              onClick={() => {
                                onOpen();
                                setModalData(patient);
                              }}
                              bg="transparent"
                              border="1px"
                              borderColor={"#E0E0E0"}
                            >
                              <MdModeEdit />
                            </Button>
                            <Button
                              onClick={() =>
                                deletePatientById(token, patient.id)
                              }
                              bg="transparent"
                              border="1px"
                              borderColor={"#E0E0E0"}
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
          <PopupAdmin
            isOpen={isOpen}
            onClose={onClose}
            modalTitle={"Edit Data Pasien"}
            submitButton={(e) =>
              editUserById(e, token, modalData?.id, modalData)
            }
            modalBody={
              <>
                <FormControl>
                  <FormLabel>Nama Pasien</FormLabel>
                  <Input
                    id={"nama_pasien"}
                    value={modalData?.nama_pasien}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>NIK</FormLabel>
                  <Input
                    id={"nik"}
                    value={modalData?.nik}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <Input
                    isDisabled={true}
                    id={"no_kk"}
                    value={modalData?.no_kk}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Usia</FormLabel>
                  <Input
                    id={"usia"}
                    value={modalData?.usia}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Alamat KTP</FormLabel>
                  <Input
                    id={"alamat_ktp"}
                    value={modalData?.alamat_ktp}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Alamat Domisili</FormLabel>
                  <Input
                    id={"alamat_domisili"}
                    value={modalData?.alamat_domisili}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Input
                    id={"jenis_kelamin"}
                    value={modalData?.jenis_kelamin}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nama Wali</FormLabel>
                  <Input
                    id={"nama_wali"}
                    value={modalData?.nama_wali}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Wali</FormLabel>
                  <Input
                    id={"email_wali"}
                    value={modalData?.email_wali}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>No Telpon Wali</FormLabel>
                  <Input
                    id={"no_telpon_wali"}
                    value={modalData?.no_telpon_wali}
                    type={"number"}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Nomor BPJS</FormLabel>
                  <Input
                    id={"no_bpjs"}
                    value={modalData?.no_bpjs}
                    onChange={(e) => handlerChangeInput(e)}
                    mb={1}
                  />
                </FormControl>
              </>
            }
           />
        </Layout>
      }
    </>
  );
}

export default TambahData;
