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
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import LayoutAdmin from "../../components/LayoutAdmin";
import addButton from "../../assets/images/addButton.svg";
import filterButton from "../../assets/images/filterButton.svg";
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
  const [submitData, setSubmitData] = React.useState({
    policlinic_id: "",
    tanggal_praktik: "",
    kuota_harian: 0,
    status: "",
  });

  //modal controller
  const {
    isOpen: isModalCreateOpen,
    onOpen: onModalCreateOpen,
    onClose: onCloseModalCreate,
  } = useDisclosure();

  //schema validation
  const schema = yup.object().shape({
    policlinic_id: yup.number().typeError("Harap masukkan id klinik"),
    tanggal_praktik: yup.string().required("Harap masukkan tanggal praktik"),
    kuota_harian: yup.number().typeError("Harap masukkan kuota yang tersedia"),
    status: yup.string().required("Harap masukkan status sekarang"),
  });

  //rhf configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  //handle change every input
  const handleInput = (e) => {
    const newData = { ...submitData };
    newData[e.target.id] = e.target.value;
    setSubmitData(newData);
    console.log(newData);
  };

  //handle send the data
  const sendData = async () => {
    await api
      .createDailyPractice(token, submitData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  //submit data
  const onSubmit = (e, data) => {
    e.preventDefault();
    sendData();
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

      <PopupAdmin
        modalTitle={"Tambah Data Praktek Harian"}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        modalBody={
          <>
            <FormControl isInvalid={errors.policlinic_id}>
              <FormLabel>ID Poliklinik</FormLabel>
              <Input
                {...register("policlinic_id")}
                placeholder="ID Poliklinik"
                id="policlinic_id"
                type="number"
                name="policlinic_id"
                onChange={(e) => handleInput(e)}
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
                onChange={(e) => handleInput(e)}
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
                onChange={(e) => handleInput(e)}
              />
              {errors.kuota_harian && (
                <FormErrorMessage>
                  {errors.kuota_harian?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.status}>
              <FormLabel>Kuota Harian</FormLabel>
              <Select
                {...register("status")}
                id="status"
                name="status"
                onChange={(e) => handleInput(e)}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </Select>
              {errors.status && (
                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
              )}
            </FormControl>
          </>
        }
        submitButton={(e) => handleSubmit(onSubmit(e))}
      />
    </LayoutAdmin>
  );
}

export default DashboardDailyPraktek;
