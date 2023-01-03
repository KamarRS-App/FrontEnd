import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  Img,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import api from "../services/api";

function DetailCariRumahSakit() {
  const { id } = useParams();
  const token = Cookies.get('token')
  const [hospital, setHospital] = useState();
  const [beds, setBeds] = useState([]);
  const navigate = useNavigate();

  const getDetailHospital = async () => {
    await api.getHospitalByID(token, id)
      .then(response => {
        const data = response.data.data;
        setHospital(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getAllBedByHospital = async () => {
    await api.getAllBeds(token, id)
      .then(response => {
        const data = response.data.data;
        setBeds(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handlerRegister = () => {
    navigate('/registrasi/pasien', {
      state: {
        hospital_id: id,
      }
    });
  }

  useEffect(() => {
    if (!token) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true
      });
      navigate('/login');
    }
    getDetailHospital();
    getAllBedByHospital();
  }, []);

  return (
    <Layout>
      <Box minW="100%" minH="100vh" h="100%">
        <Box
          px={{ base: "10", sm: "12", md: "16", lg: "24", xl: "36" }}
          pt="10"
          pb="36"
          minH="100vh"
          h="100%"
        >
          <Box w="100%">
            <Flex direction={{ base: "column", sm: "column", md: "row" }}>
              <Box h="fit" rounded="20px" borderWidth="2px" flexBasis="1/2">
                <Image
                  src={hospital?.foto}
                  w="100%"
                  rounded="20px"
                  p="10px"
                />
              </Box>
              <Box
                ml={{ base: "60px", lg: "40px", md: "20px" }}
                my="auto"
                h="100%"
                w="100%"
                mx="0"
                flexBasis="1/2"
              >
                <Box mt={{ base: 5, md: 0 }}>
                  <Text fontWeight="bold">{hospital?.nama}</Text>
                  <Text color="gray">
                    {hospital?.alamat + ", " + hospital?.kecamatan + ", " + hospital?.kabupaten_kota + ", " + hospital?.provinsi + ", " + hospital?.kode_pos}
                  </Text>
                  <Text fontWeight="bold">Kontak</Text>
                  <Text color="gray">{hospital?.no_telpon}</Text>
                  <Text fontWeight="bold">Jam Buka:</Text>
                  <Text color="gray">Open 24 hours</Text>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box w="100%" pt="100px">
            {/* <Flex>
              <Text fontWeight="bold" mr="20px" color="alta.primary">
                Update:
              </Text>
              <Text color="alta.primary">2022/12/21 11.22 WIB</Text>
            </Flex> */}
          </Box>
          <Box w="100%" mt="14">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="alta.primary">No</Th>
                    <Th color="alta.primary">Kelas</Th>
                    <Th color="alta.primary">Nama Tempat Tidur</Th>
                    <Th color="alta.primary">Ruangan</Th>
                    <Th color="alta.primary">Status</Th>
                    <Th color="alta.primary">Tindakan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    beds?.map((bed, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>Kelas {bed.kelas}</Td>
                        <Td>{bed.nama_tempat_tidur}</Td>
                        <Td>Ruang {bed.ruangan}</Td>
                        <Td
                          color={bed.status === 'tersedia' ? '#4FC208' : '#FA0A0A'}
                          fontWeight={'500'}
                        >
                          {bed.status}
                        </Td>
                        <Td>
                          <Button
                            bg={bed.status !== 'tersedia' ? 'transparent' : `#3AB8FF`}
                            _hover={{ bg: "alta.primary" }}
                            color={bed.status !== 'tersedia' ? '#15192080' : "white"}
                            borderWidth="2px"
                            disabled={bed.status === 'tersedia' ? false : true}
                            fontStyle={'600'}
                            onClick={() => handlerRegister()}
                          >
                            Daftar
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default DetailCariRumahSakit;
