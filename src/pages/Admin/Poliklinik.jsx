import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Td, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import TableAdmin from "../../components/TableAdmin";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/hooks";
import PopupAdmin from "../../components/PopupAdmin";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import PopupDelete from "../../components/PopupDelete";
import HeadAdminPoli from "../../components/HeadAdminPoli";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/select";
import api from "../../services/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

const Poliklinik = () => {
  const {
    isOpen: isModalCreateOpen,
    onOpen: onModalCreateOpen,
    onClose: onCloseModalCreate,
  } = useDisclosure();
  // const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
  // const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();

  const staff = useSelector((state) => state.staffs);
  const [policlinics, setPoliclinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [policlinicId, setPoliclinicId] = useState();
  const [praktik, setPraktik] = useState("");

  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues = {
    nama_poli: "",
    jam_praktik: "",
    hospital_id: staff.hospital_id,
  };

  const [initialValue, setInitialValue] = useState(initialValues);

  const schema = Yup.object().shape({
    nama_poli: Yup.number().required("Nama Poliklinik tidak boleh kosong"),
    jam_praktik: Yup.string().required("Jam praktik tidak boleh kosong"),
    hospital_id: Yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const searchIdDefault = (item) => {
    item.map((data, index) => {
      if (index === 0) {
        setPoliclinicId(data.id);
        setPraktik(data.jam_praktik);
      }
    });
  };

  const getPoliclinicByHospital = async () => {
    await api
      .getAllPoliclinics(token)
      .then((response) => {
        const data = response.data.data;
        setPoliclinics(data);
        searchIdDefault(data);
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

  const onChangePoliclinic = (values) => {
    setPoliclinicId(values);
  };

  const onSubmitPoliclinic = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const onErrorPoliclinic = (error) => {
    console.log(error);
  };

  const newDoctors = doctors.filter((data) => {
    return data.policlinic_id == policlinicId;
  });

  useEffect(() => {
    // if (role !== 'Admin - Staff' && token === undefined) {
    //   toast({
    //     position: 'top',
    //     title: 'Kamu Harus Login Dulu',
    //     status: 'warning',
    //     duration: '2000',
    //     isClosable: true
    //   })
    //   navigate('/admin/login');
    // }
    getPoliclinicByHospital();
    getDoctorsByPoliclinic();
  }, []);

  return (
    <LayoutAdmin activeMenu={"poli"}>
      <HeadAdminPoli
        title={"Manajemen Poliklinik"}
        onAdd={onModalCreateOpen}
        nama_poli={"Poli"}
        select_poli={
          <Select
            id={"policlinic_id"}
            value={policlinicId}
            onChange={(e) => onChangePoliclinic(e.target.value)}
          >
            {policlinics.map((data, index) => {
              return (
                <option value={data.id} key={index}>
                  {data.nama_poli}
                </option>
              );
            })}
          </Select>
        }
      />
      <Box mt={"5"} py={"10"} bg="white">
        <Flex
          color={"#333333"}
          pt={{ base: "5", sm: "0" }}
          width={{ base: "100%", sm: "auto" }}
          justifyContent={"end"}
        ></Flex>
        <TableAdmin
          headTable={
            <Tr>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                No
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Dokter
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Spesialis
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Email
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Telephone
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Jam Praktek
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Actions
              </Td>
            </Tr>
          }
          bodyTable={newDoctors.map((doctor, index) => (
            <Tr key={index}>
              <Td textAlign={"center"}>{index + 1}</Td>
              <Td textAlign={"center"}>{doctor.nama}</Td>
              <Td textAlign={"center"}>{doctor.spesialis}</Td>
              <Td textAlign={"center"}>{doctor.email}</Td>
              <Td textAlign={"center"}>{doctor.no_telpon}</Td>
              <Td textAlign={"center"}>{praktik}</Td>
              <Td textAlign="center">
                <ButtonGroup gap="4">
                  <Button
                    // onClick={onOpenModalEdit}
                    bg="transparent"
                    border="1px"
                    borderColor={"#E0E0E0"}
                  >
                    <MdModeEdit />
                  </Button>
                  <Button
                    // onClick={onOpenModalDelete}
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

      {/* <PopupAdmin
        modalTitle={'Tambahkan Poliklinik'}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        submitButton={handleSubmit}
        modalBody={
          <>
            <FormControl isInvalid={errors.nama_poli}>
              <FormLabel>Nama Poliklinik</FormLabel>
              <Input placeholder="Nama PoliKlinik" id="nama_poli" type="text" {...register('nama_poli')} />
              {errors.nama_poli && <FormErrorMessage>{errors.nama_poli.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errors.jam_praktik}>
              <FormLabel>Jam Praktik</FormLabel>
              <Input placeholder="Jam Praktik Poliklinik" type={'text'} id="jam_praktik" {...register('jam_praktik')} />
              {errors.jam_praktik && <FormErrorMessage>{errors.jam_praktik.message}</FormErrorMessage>}
            </FormControl>
          </>
        }
      /> */}

      <Modal
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        size={{ base: "xs", sm: "sm", md: "lg", lg: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          px={{ base: "5", sm: "8", md: "10" }}
          py={"5"}
          borderRadius={"3xl"}
        >
          <ModalHeader color={"#1FA8F6"} fontSize="3xl">
            <AiOutlineInfoCircle />
            <Text fontSize={"20px"} mt={"5"}>
              Tambahkan Poliklinik Baru
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={20}>{/* {modalBody} */}</ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                bg="#3AB8FF"
                color={"white"}
                fontSize={"14px"}
                fontWeight={"700"}
                width={"150px"}
                height={"50px"}
                _hover={{ bg: "alta.primary" }}
              >
                Simpan
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* <PopupDelete
        modalTitle={'Hapus Data Poli'}
        isOpen={isOpenModalDelete}
         onClose={onCloseModalDelete}
        modalBody={'Apakah anda yakin menghapus data poli ini?'}
        deletet_name={'Hapus Dokter'}
      /> */}
    </LayoutAdmin>
  );
};

export default Poliklinik;
