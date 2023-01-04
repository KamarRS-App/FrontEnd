import React, { useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Select,
  Input,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import LayoutAdmin from "../../components/LayoutAdmin";
import searchIcon from "../../assets/images/searchIcon.svg";
import HeadAdmin from "../../components/HeadAdmin";
import PopupAdmin from "../../components/PopupAdmin";
import { useDisclosure } from "@chakra-ui/hooks";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

function DashboardDailyPraktek() {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const toast = useToast();
  const navigate = useNavigate();

  //modal controller
  const {
    isOpen: isModalCreateOpen,
    onOpen: onModalCreateOpen,
    onClose: onCloseModalCreate,
  } = useDisclosure();

  //schema validation
  const schema = yup.object({
    policlinic_id: yup.number().typeError("Harap masukkan id klinik"),
    tanggal_praktik: yup.string().required("Harap masukkan tanggal praktik"),
    kuota_harian: yup.number().typeError("Harap masukkan kuota yang tersedia"),
    // status: yup.string().required("Harap masukkan status sekarang"),
  });

  //rhf configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  //handle send the data
  const sendData = async (data) => {
    await api
      .createDailyPractice(token, data)
      .then((response) => {
        toast({
          title: `Berhasil mendaftarkan data praktek harian`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  //submit data
  const onSubmit = (data) => {
    sendData(data);
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
    <LayoutAdmin activeMenu={"doctor"}>
      <HeadAdmin title="Manajemen Dokter" isAdd={onModalCreateOpen} />
      <Box>
        <Box backgroundColor="white" mt={5} minH="600px" p={5}>
          <Box>
            <Flex justifyContent={"end"}>
              <Select placeholder="Jawa Timur" w={"200px"}>
                <option value="option1">Jawa Timur</option>
                <option value="option2">Jawa Barat</option>
                <option value="option3">Jawa Tengah</option>
              </Select>
              <Select placeholder="Surabaya" w={"200px"} ml="5">
                <option value="option1">Jawa Timur</option>
                <option value="option2">Jawa Barat</option>
                <option value="option3">Jawa Tengah</option>
              </Select>
              <Button colorScheme="blue" ml="5">
                <Image src={searchIcon} />
              </Button>
            </Flex>
          </Box>
          <Box textAlign={"end"} mt="5">
            <Input
              placeholder="Mitra Keluarga Waru"
              w={{ base: "100%", lg: "300px" }}
            />
          </Box>
        </Box>
      </Box>
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
            <Text fontSize={"20px"} mt={"5"}>
              Tambah Data Praktek Harian
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={20}>
            <FormControl isInvalid={errors.policlinic_id}>
              <FormLabel>ID Poliklinik</FormLabel>
              <Input
                {...register("policlinic_id")}
                placeholder="ID Poliklinik"
                id="policlinic_id"
                type="number"
                name="policlinic_id"
              />
              {errors.policlinic_id && (
                <FormErrorMessage>
                  {errors.policlinic_id?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.tanggal_praktik}>
              <FormLabel>Tanggal Praktik</FormLabel>
              <Input
                {...register("tanggal_praktik")}
                id="tanggal_praktik"
                type="date"
                name="tanggal_praktik"
              />
              {errors.tanggal_praktik && (
                <FormErrorMessage>
                  {errors.tanggal_praktik?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.kuota_harian}>
              <FormLabel>Kuota Harian</FormLabel>
              <Input
                {...register("kuota_harian")}
                placeholder="Masukkan kuota harian"
                id="kuota_harian"
                type="number"
                name="kuota_harian"
              />
              {errors.kuota_harian && (
                <FormErrorMessage>
                  {errors.kuota_harian?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.status}>
              <FormLabel>Status</FormLabel>
              <Select
                {...register("mamang")}
                id="status"
                name="status"
                placeholder={"-- Pilih status --"}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </Select>
              {errors.status && (
                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit(onSubmit)}
              mr={3}
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
        </ModalContent>
      </Modal>
    </LayoutAdmin>
  );
}

export default DashboardDailyPraktek;
