import { Button, ButtonGroup } from "@chakra-ui/button";
import { Text, Image } from "@chakra-ui/react";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Td, Tr } from "@chakra-ui/table";
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

const PatientRegistrationPage = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const staffId = Cookies.get("id");
  const toast = useToast();
  const navigate = useNavigate();
  const [hospitalId, setHospitalId] = useState();

  const {
    isOpen: isModalEditOpen,
    onOpen: onModalEditOpen,
    onClose: onCloseModalEdit,
  } = useDisclosure();

  const schema = Yup.object().shape({});

  // ================= GET DATA STAFF SPESIFIK HOTEL ================
  const getDetailStaff = async () => {
    await api
      .getAdminById(token, staffId)
      .then((response) => {
        console.log(response.data.data);
        setHospitalId(response.data.data.hospital_id);
      })
      .catch((err) => console.log(err));
  };

  // =========== GET BED REGISTRATION DENGAN HOSPITAL ID ============
  const ngambilDaftarBedDiHospital = async () => {
    await api
      .ngambilBedYangKedaftarDiHospital(token, hospitalId)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
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
    getDetailStaff();
  }, []);

  useEffect(() => {
    ngambilDaftarBedDiHospital();
  }, [hospitalId]);

  return (
    <LayoutAdmin activeMenu={"patient"}>
      <HeadAdmin
        title={"Manajemen Pemesanan Kamar"}
        showFilter={"none"}
        showSearch={"none"}
        isAdd={onModalEditOpen}
      />
      <Box backgroundColor="white" mt={5} minH="600px" p={5}>
        <TableAdmin
          headTable={
            <Tr>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                No
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Nama Pasien
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                ID Pasien
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                ID Tempat Tidur
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Nama Tempat Tidur
              </Td>
              <Td fontWeight={"400"} textAlign="center" fontSize={"18px"}>
                Action
              </Td>
            </Tr>
          }
          bodyTable={
            <>
              <Tr>
                <Td textAlign={"center"}>ngab</Td>
                <Td textAlign={"center"}>ngab</Td>
                <Td textAlign={"center"}>ngab</Td>
                <Td textAlign={"center"}>ngab</Td>
                <Td textAlign={"center"}>ngab</Td>
                <Td>
                  <ButtonGroup gap="4">
                    <Button
                      onClick={onModalEditOpen}
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
                    >
                      <MdOutlineDeleteOutline />
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            </>
          }
        />
      </Box>
      <PopupAdmin
        modalTitle={"Ubah Data Pasien"}
        isOpen={isModalEditOpen}
        onClose={onCloseModalEdit}
        modalBody={<Text>I Love You</Text>}
      />
    </LayoutAdmin>
  );
};

export default PatientRegistrationPage;
