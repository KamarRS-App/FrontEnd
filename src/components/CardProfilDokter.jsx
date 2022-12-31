import React from 'react';
import { Center, Container, Grid, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { Box, Image, Heading, CardHeader, CardBody, Button, Link, Stack, StackDivider, Text, Card } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { MdBuild, MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';
import { useEffect, useState } from 'react';

function CardProfilDokter({ nama, email, bidang, no_telpon }) {
  let navigate = useNavigate();
  const [AllDoctors, setAllDoctors] = useState([]);
  const onDoctors = (token, id) => {
    Router.push({
      pathname: `/doctors/${id}`,
    });
  };

  const getAllDoctors = async () => {
    await api
      .getAllDoctors(token)

      .then((response) => {
        setAllDoctors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <Box>
      <Grid mb={100}>
        <Card maxW="md" mr={10} variant="unstyled">
          <CardHeader>
            <Button variant="link" mt={2} fontWeight={600} fontSize={18} color="#19345E">
              <Text>{nama}</Text>
            </Button>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />}>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Spesialis
                </Heading>
                <Text fontWeight={600} fontSize={16} color="#19345E">
                  {bidang}
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  Rumah Sakit
                </Heading>
                <Text fontWeight={600} fontSize={16} color="#19345E">
                  RS Haji Surabaya
                </Text>
              </Box>
              <Box>
                <Heading fontSize={11} fontWeight={500} color="#828282" textTransform="uppercase">
                  PoliKlinik
                </Heading>
                <Text fontWeight={600} fontSize={16} color="#19345E">
                  Klinik Anastesi
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={16} color="#19345E">
                  Jadwal Praktik
                </Text>
              </Box>
              <Box>
                <TableContainer variant="simple">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Senin</Th>
                        <Th>Selasa</Th>
                        <Th isNumeric>Jumat</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>08.00 - 12.00 </Td>
                        <Td>08.00 - 12.00</Td>
                        <Td>14.00 - 16.00</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
}

export default CardProfilDokter;
