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
import { useSelector } from "react-redux";

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

  const staff = useSelector((state) => state.staffs);

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const [beds, setBeds] = useState([]);
  const [bedId, setBedId] = useState("");
  const [currentBed, setCurrentBed] = useState([]);

  const initialValues = {
    hospital_id: staff.hospital_id,
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
    kelas: Yup.string().required("Kelas tidak boleh kosong"),
    status: Yup.string().required("Status tidak boleh kosong"),
  });

  const {
    register: createHospitalBed,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onClick",
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
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const getBedHandler = async (id) => {
    await api
      .getBedById(token, id)
      .then((response) => {
        const data = response.data.data;
        setUpdate("hospital_id", data.hospital_id);
        setUpdate("nama_tempat_tidur", data.nama_tempat_tidur);
        setUpdate("ruangan", data.ruangan);
        setUpdate("kelas", data.kelas);
        setUpdate("status", data.status);
        setCurrentBed(data);
      })
      .catch((error) => {
        if (error) {
          toast({
            position: "top",
            title: "Gagal Mendapatkan Data Bed",
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
      setUpdate("hospital_id", staff.hospital_id);
      onModalEditOpen();
    }
  };

  const onOpenAdd = () => {
    // setValue('hospital_id', staff.hospital_id);
    onModalCreateOpen();
  };

  const getAllHospitalBedHandler = async () => {
    await api.getAllBeds(token, staff.hospital_id).then((response) => {
      const data = response.data.data;
      setBeds(data);
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
      .put(`http://34.143.247.242/beds/${currentBed.id}`, data, {
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
    setUpdate("nama_tempat_tidur", "");
    setUpdate("ruangan", "");
    setUpdate("kelas", "");
    setUpdate("status", "");
  };

  const onUpdateHandler = (values) => {
    const data = new FormData();

    const nama_tempat_tidur = values.nama_tempat_tidur;
    const ruangan = values.ruangan;
    const kelas = values.kelas;
    const status = values.status;

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
    alert(error);
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
    getAllHospitalBedHandler();
  }, []);

  return (
    <LayoutAdmin activeMenu={"room"}>
      <HeadAdmin title={"Manajemen Tempat Tidur Pasien"} isAdd={onOpenAdd} />
      <Box mt={"5"} py={"10"} bg="white">
        <TableAdmin
          headTable={
            <Tr>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                No
              </Td>

              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Nama Tempat Tidur
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Ruangan
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Kelas
              </Td>
              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Status
              </Td>

              <Td fontWeight={"400"} fontSize={"18px"} textAlign="center">
                Actions
              </Td>
            </Tr>
          }
          bodyTable={
            beds.length !== 0 ? (
              beds?.map((data, index) => (
                <Tr key={index + 1}>
                  <Td textAlign={"center"}>{index + 1}</Td>

                  <Td fontWeight={"400"} textAlign="center">
                    {data.nama_tempat_tidur}
                  </Td>
                  <Td fontWeight={"400"} textAlign="center">
                    {data.ruangan}
                  </Td>
                  <Td fontWeight={"400"} textAlign="center">
                    {data.kelas}
                  </Td>
                  <Td fontWeight={"400"} textAlign="center">
                    {data.status}
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
              ))
            ) : (
              <Tr>
                <Td colSpan={"12"} textAlign={"center"}>
                  Data Kosong
                </Td>
              </Tr>
            )
          }
        />
      </Box>
      <PopupAdmin
        modalTitle={"Tambah Tempat Tidur"}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        submitButton={handleSubmit(onSubmit, onError)}
        modalBody={
          <>
            {/* <FormControl isInvalid={errors.hospital_id}>
              <FormLabel>Hospital ID</FormLabel>
              <Input placeholder="ID Rumah Sakit" id="hospital_id" type="number" {...createHospitalBed('hospital_id')} />
              {errors.hospital_id && <FormErrorMessage>{errors.hospital_id.message}</FormErrorMessage>}
            </FormControl> */}

            <FormControl mt={4} isInvalid={errors.nama_tempat_tidur}>
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

            <FormControl mt={4} isInvalid={errors.ruangan}>
              <FormLabel>Ruangan</FormLabel>
              <Select
                placeholder="Pilih Ruangan"
                id="ruangan"
                {...createHospitalBed("ruangan")}
              >
                <option>Anggrek</option>
                <option>Melati</option>
              </Select>
              {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
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
