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
import LayoutAdmin from "../../components/LayoutAdmin";
import addButton from "../../assets/images/addButton.svg";
import filterButton from "../../assets/images/filterButton.svg";
import searchIcon from "../../assets/images/searchIcon.svg";
import HeadAdmin from "../../components/HeadAdmin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function DashboardDailyPraktek() {
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  const toast = useToast();
    const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'Admin - Staff' && token === undefined) {
        toast({
            position: 'top',
            title: 'Kamu Harus Login Dulu',
            status: 'warning',
            duration: '2000',
            isClosable: true
        })
        navigate('/admin/login');
    }
}, []);
  return (
    <LayoutAdmin activeMenu={"doctor"}>
      <HeadAdmin title="Manajemen Dokter" />
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
    </LayoutAdmin>
  );
}

export default DashboardDailyPraktek;
