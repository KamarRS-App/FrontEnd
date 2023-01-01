import { Button, ButtonGroup } from "@chakra-ui/button";
import { Td, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import HeadAdmin from "../../components/HeadAdmin";
import LayoutAdminRoot from "../../components/LayoutAdminRoot";
import TableAdmin from "../../components/TableAdmin";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import PopupAdmin from "../../components/PopupAdmin";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Stack, useToast } from "@chakra-ui/react";
import api from "../../services/api";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import PopupDelete from "../../components/PopupDelete";

const AdminRoot = () => {
  const {
    isOpen: isModalCreateOpen,
    onOpen: onModalCreateOpen,
    onClose: onCloseModalCreate,
  } = useDisclosure();
  const {
    isOpen: isModalEditOpen,
    onOpen: onModalEditOpen,
    onClose: onCloseModalEdit,
  } = useDisclosure();
  const {
    isOpen: isModalDeleteOpen,
    onOpen: onModalDeleteOpen,
    onClose: onCloseModalDelete,
  } = useDisclosure();

  const role = Cookies.get("role");
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const toast = useToast();
  const [adminStaff, setAdminStaff] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState("");
  const [adminId, setAdminId] = useState("");

  const initialValues = {
    nama: "",
    email: "",
    kata_sandi: "",
    peran: "Admin",
    hospital_id: null,
  };

  const initialValuesUpdate = {
    nama: "",
    email: "",
    peran: "Admin",
    hospital_id: null,
  };

  const [initialValue, setInitialValue] = useState(initialValues);
  const [initialValueUpdate, setInitialValueUpdate] =
    useState(initialValuesUpdate);

  const schema = Yup.object().shape({
    nama: Yup.string().required("Nama tidak boleh kosong"),
    email: Yup.string()
      .email("Format Email salah")
      .required("Email tidak boleh kosong"),
    kata_sandi: Yup.string()
      .min(6, "Password tidak boleh kurang dari 6 karakter")
      .max(32, "Password tidak boleh lebih dari 32 karakter")
      .required("Password tidak boleh kosong"),
    hospital_id: Yup.number().required(
      "Rumah Sakit Bekerja tidak boleh kosong"
    ),
  });

  const schemaUpdate = Yup.object().shape({
    nama: Yup.string().required("Nama tidak boleh kosong"),
    email: Yup.string()
      .email("Format Email salah")
      .required("Email tidak boleh kosong"),
    hospital_id: Yup.number().required(
      "Rumah Sakit Bekerja tidak boleh kosong"
    ),
  });

  const {
    register: createAdmin,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const {
    register: updateAdminFunc,
    handleSubmit: handleUpdateAdmin,
    setValue: setValueUpdate,
    formState: { errors: errorsUpdate },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schemaUpdate),
    defaultValues: initialValueUpdate,
  });

  const getAllAdminStaff = async () => {
    await api
      .getAdmin(token)
      .then((response) => {
        const data = response.data.data;
        setAdminStaff(data);
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Gagal Mengambil Data Admin",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const getAdminStaffById = async (id) => {
    await api.getAdminById(token, id).then((response) => {
      const data = response.data.data;
      setValueUpdate("nama", data.nama);
      setValueUpdate("email", data.email);
      setValueUpdate("hospital_id", data.hospital_id);
    });
  };

  const createAdminStaff = async (data) => {
    await api
      .createAdmin(token, data)
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil membuat Admin Baru",
          status: "success",
          duration: "2000",
          isClosable: true,
        });
        getAllHospitalsHandler();
        getAllAdminStaff();
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: "top",
          title: "Gagal membuat Admin Baru",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const getAllHospitalsHandler = async () => {
    await api
      .getHospitals(token)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Gagal Mengambil Data Rumah Sakit",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const updateAdminStaff = async (id, data) => {
    await api
      .updateAdmin(token, id, data)
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil Mengubah Data Admin",
          status: "success",
          duration: "2000",
          isClosable: true,
        });
        getAllAdminStaff();
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: "top",
          title: "Gagal Mengubah Data Admin",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const adminDeleteHandler = async (id) => {
    await api
      .deleteAdmin(token, id)
      .then((response) => {
        toast({
          position: "top",
          title: "Berhasil Menghapus Data Admin",
          status: "success",
          duration: "2000",
          isClosable: true,
        });
        getAllAdminStaff();
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: "top",
          title: "Gagal Menghapus Data Admin",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const onSubmitCreate = (values) => {
    createAdminStaff(values);
    onCloseModalCreate();
  };

  const onUpdateSubmit = (data) => {
    updateAdminStaff(adminId, data);
    onCloseModalEdit();
  };

  const onEditHandler = (id) => {
    setAdminId(id);
    getAdminStaffById(id);
    onModalEditOpen();
  };

  const onDeleteClicked = (id) => {
    onModalDeleteOpen();
    setAdminId(id);
  };

  const onDeleteHandler = () => {
    adminDeleteHandler(adminId);
    onCloseModalDelete();
  };

  const onShowPassword = (e) => {
    setShow(e.target.value);
  };

  useEffect(() => {
    if (role !== "super admin" && token === undefined) {
      toast({
        position: "top",
        title: "Kamu Harus Login Dulu",
        status: "warning",
        duration: "2000",
        isClosable: true,
      });
      navigate("/root/login");
    }
    getAllAdminStaff();
    getAllHospitalsHandler();
  }, []);
  return (
    <LayoutAdminRoot activeMenu={"user"}>
      <HeadAdmin
        title={"Manajemen Akun Super Admin Rumah Sakit"}
        isAdd={onModalCreateOpen}
      />
      <TableAdmin
        headTable={
          <Tr>
            <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
              No
            </Td>
            <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
              Nama
            </Td>
            <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
              Email
            </Td>
            <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
              Peran
            </Td>
            <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
              Rumah Sakit
            </Td>
            <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
              Actions
            </Td>
          </Tr>
        }
        bodyTable={
          adminStaff.length !== 0 ? (
            adminStaff.map((data, index) => (
              <Tr key={index + 1}>
                <Td textAlign={"center"}>{index + 1}</Td>
                <Td textAlign={"center"}>{data.nama}</Td>
                <Td textAlign={"center"}>{data.email}</Td>
                <Td textAlign={"center"}>{data.peran}</Td>
                <Td textAlign={"center"}>
                  {hospitals.map((hospital) => {
                    if (hospital.id === data.hospital_id) {
                      return hospital.nama;
                    }
                  })}
                </Td>
                <Td textAlign={"center"}>
                  <ButtonGroup gap="4">
                    <Button
                      onClick={() => onEditHandler(data.id)}
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
              <Td colSpan={"6"} textAlign={"center"}>
                Data Kosong
              </Td>
            </Tr>
          )
        }
      />
      <PopupAdmin
        modalTitle={"Tambahkan Akun Admin Rumah Sakit"}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        submitButton={handleSubmit(onSubmitCreate)}
        modalBody={
          <>
            <FormControl isInvalid={errors.nama}>
              <FormLabel>Nama</FormLabel>
              <Input
                placeholder="Masukan Nama Karyawan"
                id="nama"
                type="text"
                {...createAdmin("nama")}
              />
              {errors.nama && (
                <FormErrorMessage>{errors.nama.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={"4"} isInvalid={errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="Email Address"
                id="email"
                type="email"
                {...createAdmin("email")}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={"4"} isInvalid={errors.kata_sandi}>
              <FormLabel>Password</FormLabel>
              <Stack position={"relative"}>
                <Input
                  placeholder="password"
                  id="kata_sandi"
                  type={showPassword ? "text" : "password"}
                  onInput={onShowPassword}
                  {...createAdmin("kata_sandi")}
                />
                {show && (
                  <Box
                    position={"absolute"}
                    right={"4"}
                    bottom={"4"}
                    cursor={"pointer"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </Box>
                )}
              </Stack>
              {errors.kata_sandi && (
                <FormErrorMessage>{errors.kata_sandi.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={"4"} isInvalid={errors.hospital_id}>
              <FormLabel>Rumah Sakit</FormLabel>
              <Select
                placeholder="Pilih Rumah Sakit"
                id="hospital_id"
                {...createAdmin("hospital_id")}
              >
                {hospitals.map((data) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.nama}
                    </option>
                  );
                })}
              </Select>
              {errors.hospital_id && (
                <FormErrorMessage>
                  {errors.hospital_id.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </>
        }
      />

      <PopupAdmin
        modalTitle={"Ubah Akun Admin Rumah Sakit"}
        isOpen={isModalEditOpen}
        onClose={onCloseModalEdit}
        submitButton={handleUpdateAdmin(onUpdateSubmit)}
        modalBody={
          <>
            <FormControl isInvalid={errorsUpdate.nama}>
              <FormLabel>Nama</FormLabel>
              <Input
                placeholder="Masukan Nama Karyawan"
                id="nama"
                type="text"
                {...updateAdminFunc("nama")}
              />
              {errorsUpdate.nama && (
                <FormErrorMessage>{errorsUpdate.nama.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={"4"} isInvalid={errorsUpdate.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="Email Address"
                id="email"
                type="email"
                {...updateAdminFunc("email")}
              />
              {errorsUpdate.email && (
                <FormErrorMessage>
                  {errorsUpdate.email.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={"4"} isInvalid={errorsUpdate.hospital_id}>
              <FormLabel>Rumah Sakit</FormLabel>
              <Select
                placeholder="Pilih Rumah Sakit"
                id="hospital_id"
                {...updateAdminFunc("hospital_id")}
              >
                {hospitals.map((data) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.nama}
                    </option>
                  );
                })}
              </Select>
              {errorsUpdate.hospital_id && (
                <FormErrorMessage>
                  {errorsUpdate.hospital_id.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </>
        }
      />
      <PopupDelete
        isOpen={isModalDeleteOpen}
        modalTitle={"Hapus Admin Rumah Sakit"}
        modalBody={"Apakah kamu yakin menghapus admin?"}
        onClose={onCloseModalDelete}
        deletet_name={"Hapus Akun"}
        onDelete={() => onDeleteHandler(adminId)}
      />
    </LayoutAdminRoot>
  );
};

export default AdminRoot;
