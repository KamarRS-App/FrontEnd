import { Button, ButtonGroup } from "@chakra-ui/button";
import { Text, Image } from "@chakra-ui/react";
import { Badge, Box, Flex, Stack } from "@chakra-ui/layout";
import { TableCaption, Td, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import HeadAdmin from "../../components/HeadAdmin";
import LayoutAdmin from "../../components/LayoutAdmin";
import TableAdmin from "../../components/TableAdmin";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import PopupAdmin from "../../components/PopupAdmin";
import searchIcon from "../../assets/images/searchIcon.svg";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import Loading from "../../components/Loading";

const PatientRegistrationPage = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const staffId = Cookies.get("id");
  const toast = useToast();
  const navigate = useNavigate();
  const [hospitalId, setHospitalId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [daftarBed, setDaftarBed] = useState();
  const [totalPage, setTotalPage] = useState();
  const [selectedBed, setSelectedBed] = useState();
  const [loading, setLoading] = useState(true);

  const {
    isOpen: isModalEditOpen,
    onOpen: onModalEditOpen,
    onClose: onCloseModalEdit,
  } = useDisclosure();

  // pagination handler
  const onChangePage = (page) => {
    setCurrentPage(page);
    setDaftarBed(null);
  };

  // ================= GET DATA STAFF SPESIFIK HOTEL ================
  const getDetailStaff = async () => {
    await api
      .getAdminById(token, staffId)
      .then((response) => {
        setHospitalId(response.data.data.hospital_id);
        setLoading(false);
        ngambilDaftarBedDiHospital(
          token,
          response.data.data.hospital_id,
          currentPage
        );
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

  // =========== GET BED REGISTRATION DENGAN HOSPITAL ID ============
  const ngambilDaftarBedDiHospital = async (token, hospitalId, currentPage) => {
    await api
      .ngambilBedYangKedaftarDiHospital(token, hospitalId, currentPage)
      .then((response) => {
        setDaftarBed(response.data.data);
        setTotalPage(response.data.total_page);
      });
  };

  //========== DELETE BED RESERVATION BY ID ======================
  const hapusBedRegistrasi = async (token, id) => {
    await api
      .DeleteBedRegistrationsById(token, id)
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil menghapus data registrasi kamar",
          status: "success",
          duration: "2000",
          isClosable: true,
        });
        ngambilDaftarBedDiHospital(token, hospitalId, currentPage);
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Gagal menghapus data registrasi kamar",
          status: "warning",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  //============== EDIT BED RESERVATION BY ID ==================
  const handlerChangeInput = (e) => {
    const newData = { ...selectedBed };
    if (e.target.type === "number") {
      newData[e.target.id] = parseInt(e.target.value);
    } else {
      newData[e.target.id] = e.target.value;
    }
    setSelectedBed(newData);
  };

  // update data bed registration
  const updateBedRegistrations = async (token, id, data) => {
    await api
      .updateBedRegistrations(token, id, data)
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil memperbaharui data reservasi kamar",
          status: "success",
          duration: "2000",
          isClosable: true,
        });
        ngambilDaftarBedDiHospital(token, hospitalId, currentPage);
        onCloseModalEdit();
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Gagal memperbaharui data reservasi kamar",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  // submit data
  const onSubmitEdited = (selectedBed) => {
    updateBedRegistrations(token, selectedBed.id, selectedBed);
  };

  //================== USE EFFECT ===========================

  useEffect(() => {
    if (role !== "Admin - Staff" && token === undefined) {
      toast({
        position: "top",
        title: "Kamu Harus Login Dulu",
        status: "warning",
        duration: "2000",
        isClosable: true,
      });
      navigate("/admin/login");
    }
    getDetailStaff();
  }, []);

  useEffect(() => {
    ngambilDaftarBedDiHospital(token, hospitalId, currentPage);
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Loading body={"Sedang memuat data"} />
      ) : (
        <LayoutAdmin activeMenu={"patient"}>
          <HeadAdmin
            title={"Manajemen Pemesanan Kamar"}
            showFilter={"none"}
            showSearch={"none"}
            showAdd={"none"}
          />
          <Box backgroundColor="white" mt={5} minH="600px" p={5}>
            <TableAdmin
              headTable={
                <Tr>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    No
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Action
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Status Pembayaran
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Status Pasien
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Biaya Registrasi
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Kode Daftar
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Metode Pembayaran
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Link Pembayaran
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    ID Transaksi
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Virtual Account
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Bank Penerima
                  </Td>
                  <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                    Waktu Kadaluarsa
                  </Td>
                </Tr>
              }
              bodyTable={
                <>
                  {daftarBed ? (
                    daftarBed.map((bed, index) => {
                      return (
                        <Tr key={index}>
                          <Td textAlign={"center"}>{index + 1}</Td>
                          <Td>
                            <ButtonGroup gap="4">
                              <Button
                                onClick={() => {
                                  onModalEditOpen();
                                  setSelectedBed(bed);
                                }}
                                bg="transparent"
                                border="1px"
                                borderColor={"#E0E0E0"}
                              >
                                <MdModeEdit />
                              </Button>
                              <Button
                                bg="transparent"
                                border="1px"
                                borderColor={"#E0E0E0"}
                                onClick={() =>
                                  hapusBedRegistrasi(token, bed.id)
                                }
                              >
                                <MdOutlineDeleteOutline />
                              </Button>
                            </ButtonGroup>
                          </Td>
                          <Td textAlign={"center"}>
                            {bed.status_pembayaran === "settlement" ? (
                              <Badge colorScheme="green">
                                {bed.status_pembayaran}
                              </Badge>
                            ) : bed.status_pembayaran === "pending" ? (
                              <Badge colorScheme={"red"}>
                                {bed.status_pembayaran}
                              </Badge>
                            ) : bed.status_pembayaran ===
                              "settlement via BPJS" ? (
                              <Badge colorScheme="green">
                                {bed.status_pembayaran}
                              </Badge>
                            ) : bed.status_pembayaran === "belum dibayar" ? (
                              <Badge colorScheme={"red"}>
                                {bed.status_pembayaran}
                              </Badge>
                            ) : (
                              <Badge>{bed.status_pembayaran}</Badge>
                            )}
                          </Td>
                          <Td textAlign={"center"}>{bed.status_pasien}</Td>
                          <Td textAlign={"center"}>{bed.biaya_registrasi}</Td>
                          <Td textAlign={"center"}>{bed.Kode_daftar}</Td>
                          <Td textAlign={"center"}>{bed.payment_method}</Td>
                          <Td textAlign={"center"} color={"blue"}>
                            <Link hrefLang={bed.link_pembayaran}>
                              Link Pembayaran
                            </Link>
                          </Td>
                          <Td textAlign={"center"}>{bed.transaction_id}</Td>
                          <Td textAlign={"center"}>{bed.virtual_account}</Td>
                          <Td textAlign={"center"}>{bed.bank_penerima}</Td>
                          <Td textAlign={"center"}>{bed.waktu_kedaluarsa}</Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Box textAlign={"center"}>
              <Pagination
                total={totalPage * 10}
                onChange={onChangePage}
                current={currentPage}
                defaultCurrent={1}
              />
            </Box>
          </Box>
          <PopupAdmin
            modalTitle={"Ubah Data Bed Reservation"}
            isOpen={isModalEditOpen}
            onClose={onCloseModalEdit}
            displayButton={"none"}
            modalBody={
              <>
                <Text fontWeight={"bold"}>Bed ID: {selectedBed?.id}</Text>
                <Box mt={5}>
                  <FormControl>
                    <FormLabel>Status Pasien:</FormLabel>
                    <Input
                      value={selectedBed?.status_pasien}
                      id={"status_pasien"}
                      onChange={(e) => handlerChangeInput(e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Biaya Registrasi</FormLabel>
                    <Input
                      value={selectedBed?.biaya_registrasi}
                      id={"biaya_registrasi"}
                      type={"number"}
                      onChange={(e) => handlerChangeInput(e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status Pembayaran:</FormLabel>
                    <Select
                      id={"status_pembayaran"}
                      value={selectedBed?.status_pembayaran}
                      onChange={(e) => handlerChangeInput(e)}
                    >
                      <option value={"settlement"}>settlement</option>
                      <option value={"pending"}>pending</option>
                      <option value={"settlement via BPJS"}>
                        settlement via BPJS
                      </option>
                      <option value={"belum dibayar"}>belum dibayar</option>
                      <option value={"expire"}>expire</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bed Id:</FormLabel>
                    <Input
                      value={selectedBed?.bed_id}
                      id={"bed_id"}
                      onChange={(e) => handlerChangeInput(e)}
                    />
                  </FormControl>
                  <Box textAlign={"end"} mt={5}>
                    <Button
                      onClick={() => onSubmitEdited(selectedBed)}
                      bg="#3AB8FF"
                      color={"white"}
                      fontSize={"14px"}
                      fontWeight={"700"}
                      width={"150px"}
                      height={"50px"}
                      _hover={{ bg: "alta.primary" }}
                    >
                      Perbaharui Data
                    </Button>
                  </Box>
                </Box>
              </>
            }
          />
        </LayoutAdmin>
      )}
    </>
  );
};

export default PatientRegistrationPage;
