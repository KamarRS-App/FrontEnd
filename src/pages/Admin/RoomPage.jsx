import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import HeadAdmin from "../../components/HeadAdmin";
import TableAdmin from "../../components/TableAdmin";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Td,
  Tr,
  useDisclosure,
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import PopupAdmin from "../../components/PopupAdmin";
import { FormErrorMessage } from "@chakra-ui/form-control";
import PopupDelete from "../../components/PopupDelete";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import api from "../../services/api";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { async } from "postcss-js";

const RoomPage = () => {
  const {
    isOpen: isModalCreateOpen,
    onOpen: onModalCreateOpen,
    onClose: onCloseModalCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onModalEditOpen,
    onClose: onCloseModalEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDelete,
    onOpen: onModalDeleteOpen,
    onClose: onCloseModalDelete,
  } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const {
    getInputProps: inputBed,
    getIncrementButtonProps: incBed,
    getDecrementButtonProps: decBed,
  } = useNumberInput({
    step: 1,
    defaultValue: 10,
    min: 1,
    max: 100,
    precision: 0,
  });

  const {
    getInputProps: inputBedAvailable,
    getIncrementButtonProps: incBedAvailable,
    getDecrementButtonProps: decBedAvailable,
  } = useNumberInput({
    step: 1,
    defaultValue: 10,
    min: 1,
    max: 100,
    precision: 0,
  });

  const {
    getInputProps: inputBedAvailableInfo,
    getIncrementButtonProps: incBedAvailableInfo,
    getDecrementButtonProps: decBedAvailableInfo,
  } = useNumberInput({
    step: 1,
    defaultValue: 10,
    min: 1,
    max: 100,
    precision: 0,
  });

  const {
    getInputProps: inputBedInfo,
    getIncrementButtonProps: incBedInfo,
    getDecrementButtonProps: decBedInfo,
  } = useNumberInput({
    step: 1,
    defaultValue: 10,
    min: 1,
    max: 100,
    precision: 0,
  });

  const inc = incBed();
  const dec = decBed();
  const input = inputBed();

  const incAvailable = incBedAvailable();
  const decAvailable = decBedAvailable();
  const inputAvailable = inputBedAvailable();

  const incInfo = incBedInfo();
  const decInfo = decBedInfo();
  const inputInfo = inputBedInfo();

  const incAvailableInfo = incBedAvailableInfo();
  const decAvailableInfo = decBedAvailableInfo();
  const inputAvailableInfo = inputBedAvailableInfo();

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const [beds, setBeds] = useState([]);
  const [bedId, setBedId] = useState("");
  const [currentBed, setCurrentBed] = useState([]);

  const initialValues = {
    hospital_id: "null",
    nama_tempat_tidur: "",
    ruangan: "",
    kelas: "",
    status: "",
  };

  const [initialValue, setInitialValue] = useState(initialValues);

  const schema = Yup.object().shape({
    hospital_id: Yup.number().required("Kode Rumah Sakit tidak boleh kosong"),
    nama_tempat_tidur: Yup.string().required(
      "Nama Tempat Tidur tidak boleh kosong"
    ),
    ruangan: Yup.string().required("Ruangan tidak boleh kosong"),
    status: Yup.string().required("Status tidak boleh kosong"),
  });

  const {
    register: createHospitalBed,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const {
    register: updateHospitalBed,
    handleSubmit: handleUpdate,
    formState: { errors: errorsUpdate },
    setValue: setUpdate,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const getBedHandler = async (id) => {
    await api
      .getBedById(token, id)
      .then((response) => {
        const data = response.data.data;
        setValueUpdate("hospital_id", data.hospital_id);
        setValueUpdate("nama_tempat_tidur", data.nama_tempat_tidur);
        setValueUpdate("ruangan", data.ruangan);
        setValueUpdate("kelas", data.kelas);
        setValueUpdate("status", data.status);
        setCurrentBed(data);
      })
      .catch((error) => {
        if (error) {
          toast({
            position: "top",
            title: "Gagal Mendapatkan Data Rumah Sakit",
            status: "error",
            duration: "1500",
            isClosable: true,
          });
        }
      });
  };

  const onHandlerEdit = (id) => {
    getBedHandler(id);
    if (currentBed) {
      onModalEditOpen();
    }
  };

  const getAllHospitalBedHandler = async () => {
    await api.getBedById(token).then((response) => {
      const data = response.data.data;
      setBeds;
    });
  };

  const createHospitalBedHandler = async (data) => {
    await axios
      .post("http://34.143.247.242/beds", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil Menambahkan Data Bed",
          status: "success",
          duration: "1500",
          isClosable: true,
        });
        getAllHospitalBedHandler();
        onCloseModalCreate();
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Gagal Menambahkan Data Bed",
          status: "error",
          duration: "1500",
          isClosable: true,
        });
      });
  };

  const updateHospitalBedHandler = async (data) => {
    await axios
      .put(`http://34.143.247.242/beds/${currentHospital.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil Menambahkan Data Bed",
          status: "success",
          duration: "1500",
          isClosable: true,
        });
        onCloseModalEdit();
        getAllHospitalBedHandler();
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Gagal Menambahkan Data Bed",
          status: "error",
          duration: "1500",
          isClosable: true,
        });
      });
  };

  const deleteHospitalBedHandler = async (id) => {
    await api
      .DeleteBedById(token, id)
      .then((response) => {
        console.log(response.data);
        toast({
          position: "top",
          title: "Berhasil Menghapus Data Bed",
          status: "success",
          duration: "1500",
          isClosable: true,
        });
        getAllHospitalBedHandler();
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: "top",
          title: "Gagal Menghapus Data Bed",
          status: "error",
          duration: "1500",
          isClosable: true,
        });
      });
  };

  const onSubmit = (values) => {
    const data = new FormData();

    data.append("hospital_id", values.hospital_id);
    data.append("nama_tempat_tidur", values.nama_tempat_tidur);
    data.append("ruangan", values.ruangan);
    data.append("kelas", values.kelas);
    data.append("status", values.status);

    createHospitalBedHandler(data);
    setUpdate("hospital_id", "");
    setUpdate("nama_tempat_tidur", "");
    setUpdate("ruangan", "");
    setUpdate("kelas", "");
    setUpdate("status", "");
  };

  const onUpdateHandler = (values) => {
    const data = new FormData();

    const nama_tempat_tidur =
      values.nama_tempat_tidur !== ""
        ? parseInt(values.nama_tempat_tidur)
        : currentBed.nama_tempat_tidur;
    const ruangan =
      values.ruangan !== "" ? parseInt(values.ruangan) : currentBed.ruangan;
    const kelas =
      values.kelas !== "" ? parseInt(values.kelas) : currentBed.kelas;
    const status =
      values.status !== "" ? parseInt(values.status) : currentBed.status;

    data.append("nama_tempat_tidur", nama_tempat_tidur);
    data.append("ruangan", ruangan);
    data.append("kelas", kelas);
    data.append("status", status);

    updateHospitalBedHandler(data);
  };
  const onDeleteClicked = (id) => {
    onModalDeleteOpen();
    setBedId(id);
  };
  const onDeleteHandler = () => {
    deleteHospitalBedHandler(bedId);
    onCloseModalDelete();
  };

  const onError = (error) => {
    console.log(error);
  };

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
  }, []);

  return (
    <LayoutAdmin activeMenu={"room"}>
      <HeadAdmin
        title={"Manajemen Tempat Tidur Pasien"}
        isAdd={onModalCreateOpen}
      />
      <Box mt={"5"} py={"10"} bg="white">
        <TableAdmin
          headTable={
            <Tr>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                No
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Ruangan
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Bed Tersedia
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                BPJS
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Bed Kosong
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Status
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Actions
              </Td>
            </Tr>
          }
          bodyTable={DataRoom.map((room) => (
            <Tr>
              <Td fontWeight={"400"} textAlign="center">
                {room.no}
              </Td>
              <Td fontWeight={"400"} textAlign="center">
                {room.ruang}
              </Td>
              <Td fontWeight={"400"} textAlign="center">
                {room.bed_total}
              </Td>
              <Td fontWeight={"400"} textAlign="center">
                {room.BPJS}
              </Td>
              <Td fontWeight={"400"} textAlign="center">
                {room.bed_available}
              </Td>
              <Td fontWeight={"400"} textAlign="center">
                {room.status}
              </Td>
              <Td fontWeight={"400"} textAlign="center">
                <ButtonGroup gap="4">
                  <Button
                    onClick={() => onHandlerEdit(data.id)}
                    bg="transparent"
                    border="1px"
                    borderColor={"#E0E0E0"}
                  >
                    <MdModeEdit />
                  </Button>
                  <Button
                    onClick={() => onDeleteClicked(data.id)}
                    bg="transparent"
                    border="1px"
                    borderColor={"#E0E0E0"}
                  >
                    <MdOutlineDeleteOutline />
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        />
      </Box>
      <PopupAdmin
        modalTitle={"Tambah Tempat Tidur"}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        submitButton={handleSubmit(onSubmit, onError)}
        modalBody={
          <>
            <FormControl isInvalid={errors.nama_tempat_tidur}>
              <FormLabel>Nama Tempat Tidur</FormLabel>
              <Input
                placeholder="Nama Tempat Tidur"
                id="nama_tempat_tidur"
                type="text"
                {...createHospitalBed("nama_tempat_tidur")}
              />
              {errors.nama_tempat_tidur && (
                <FormErrorMessage>
                  {errors.nama_tempat_tidur.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.ruangan}>
              <FormLabel>Ruangan</FormLabel>
              <Input
                placeholder="Ruangan"
                id="ruang"
                type="text"
                {...createHospitalBed("ruangan")}
              />
              {errors.ruangan && (
                <FormErrorMessage>{errors.ruangan.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.kelas}>
              <FormLabel>Kelas</FormLabel>
              <Input
                placeholder="Kelas "
                type={"text"}
                id="kelas"
                {...createHospitalBed("kelas")}
              />
              {errors.kelas && (
                <FormErrorMessage>{errors.kelas.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bed Tersedia</FormLabel>
              <HStack maxW={"80"} bg="#F5F6F8">
                <Button
                  {...dec}
                  color="white"
                  bg={"#E74C3C"}
                  _hover={{ bg: "#E74C3C" }}
                >
                  -
                </Button>
                <Input
                  borderRadius="0"
                  {...input}
                  bg="#F5F6F8"
                  border={"none"}
                />
                <Button
                  {...inc}
                  bg={"#2F80ED"}
                  color="white"
                  _hover={{ bg: "#2F80ED" }}
                >
                  +
                </Button>
              </HStack>
              {/* {errors.handphone && <FormErrorMessage>{errors.handphone.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>BPJS</FormLabel>
              <Select placeholder="Pilih Layanan BPJS" id="bpjs">
                <option>iya</option>
                <option>tidak</option>
              </Select>
              {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bed Kosong</FormLabel>
              <HStack maxW={"80"} bg="#F5F6F8">
                <Button
                  {...decAvailable}
                  color="white"
                  bg={"#E74C3C"}
                  _hover={{ bg: "#E74C3C" }}
                >
                  -
                </Button>
                <Input
                  borderRadius="0"
                  {...inputAvailable}
                  bg="#F5F6F8"
                  border={"none"}
                />
                <Button
                  {...incAvailable}
                  bg={"#2F80ED"}
                  color="white"
                  _hover={{ bg: "#2F80ED" }}
                >
                  +
                </Button>
              </HStack>
              {/* {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.status}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Pilih Status Kamar Tidur"
                id="status"
                {...createHospitalBed("status")}
              >
                <option>tersedia</option>
                <option>tidak tersedia</option>
              </Select>
              {errors.status && (
                <FormErrorMessage>{errors.status.message}</FormErrorMessage>
              )}
            </FormControl>
          </>
        }
      />

      <PopupAdmin
        modalTitle={"Ubah Info Tempat Tidur"}
        isOpen={isOpenModalEdit}
        onClose={onCloseModalEdit}
        submitButton={handleUpdate(onUpdateHandler)}
        modalBody={
          <>
            <FormControl isInvalid={errorsUpdate.nama_tempat_tidur}>
              <FormLabel>Nama Tempat Tidur</FormLabel>
              <Input
                placeholder="Nama Tempat Tidur"
                id="nama_tempat_tidur"
                type="text"
                {...updateHospitalBed("nama_tempat_tidur")}
              />
              {errorsUpdate.nama_tempat_tidur && (
                <FormErrorMessage>
                  {errors.nama_tempat_tidur.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errorsUpdate.ruangan}>
              <FormLabel>Ruangan</FormLabel>
              <Input
                placeholder="Ruangan"
                id="ruang"
                type="text"
                {...updateHospitalBed("ruangan")}
              />
              {errorsUpdate.ruangan && (
                <FormErrorMessage>{errors.ruangan.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsUpdate.kelas}>
              <FormLabel>Kelas</FormLabel>
              <Input
                placeholder="Kelas Ruangan"
                type={"text"}
                id="kelas"
                {...updateHospitalBed("kelas")}
              />
              {errorsUpdate.kelas && (
                <FormErrorMessage>{errors.kelas.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bed Tersedia</FormLabel>
              <HStack maxW={"80"} bg="#F5F6F8">
                <Button
                  {...decInfo}
                  color="white"
                  bg={"#E74C3C"}
                  _hover={{ bg: "#E74C3C" }}
                >
                  -
                </Button>
                <Input
                  borderRadius="0"
                  {...inputInfo}
                  bg="#F5F6F8"
                  border={"none"}
                />
                <Button
                  {...incInfo}
                  bg={"#2F80ED"}
                  color="white"
                  _hover={{ bg: "#2F80ED" }}
                >
                  +
                </Button>
              </HStack>
              {/* {errors.handphone && <FormErrorMessage>{errors.handphone.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>BPJS</FormLabel>
              <Select placeholder="Pilih Layanan BPJS" id="bpjs">
                <option>iya</option>
                <option>tidak</option>
              </Select>
              {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bed Kosong</FormLabel>
              <HStack maxW={"80"} bg="#F5F6F8">
                <Button
                  {...decAvailableInfo}
                  color="white"
                  bg={"#E74C3C"}
                  _hover={{ bg: "#E74C3C" }}
                >
                  -
                </Button>
                <Input
                  borderRadius="0"
                  {...inputAvailableInfo}
                  bg="#F5F6F8"
                  border={"none"}
                />
                <Button
                  {...incAvailableInfo}
                  bg={"#2F80ED"}
                  color="white"
                  _hover={{ bg: "#2F80ED" }}
                >
                  +
                </Button>
              </HStack>
              {/* {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsUpdate.status}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Pilih Status Kamar Tidur"
                id="status"
                {...updateHospitalBed("status")}
              >
                <option>tersedia</option>
                <option>tidak tersedia</option>
              </Select>
              {errorsUpdate.status && (
                <FormErrorMessage>{errors.status.message}</FormErrorMessage>
              )}
            </FormControl>
          </>
        }
      />

      <PopupDelete
        isOpen={isOpenModalDelete}
        onClose={onCloseModalDelete}
        onDelete={() => onDeleteHandler(bedId)}
        modalBody={"Apakah anda yakin menghapus ruangan ini?"}
        modalTitle={"Hapus Ruangan"}
        delete_name={"Hapus Ruangan"}
      />
    </LayoutAdmin>
  );
};

const DataRoom = [
  {
    no: 1,
    ruang: "presidential",
    kelas: "VVIP",
    bed_total: 30,
    BPJS: "tidak",
    bed_available: 0,
    status: "tidak tersedia",
  },
  {
    no: 2,
    ruang: "Luxury",
    kelas: "I",
    bed_total: 18,
    BPJS: "tidak",
    bed_available: 0,
    status: "tidak tersedia",
  },
  {
    no: 3,
    ruang: "Deluxe",
    kelas: "II",
    bed_total: 18,
    BPJS: "iya",
    bed_available: 4,
    status: "tersedia",
  },
  {
    no: 4,
    ruang: "Superior",
    kelas: "III",
    bed_total: 15,
    BPJS: "iya",
    bed_available: 7,
    status: "tersedia",
  },
];

export default RoomPage;
