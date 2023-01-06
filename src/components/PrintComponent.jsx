import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useRef } from "react";

// component to be printed
export class PrintComponent extends React.Component {
  render() {
    const { nama, jenis_kelamin, no_telpon, email, hospital, policlinic, doctor, practice_date, practice_time, no_antrian } = this.props;
    return (
      <Box
        mt={'5'}
        py={'10'}
        mx={'10'}
        maxWidth={'700px'}
        bg="white"
        color={'black'}
        borderWidth={'2px'}
        p="5"
        rounded={'10px'}
        borderColor={'#00000042'}
      >
        <Text
          fontSize={20}
          color="#072051"
          fontWeight={700}
          textAlign={'center'}
          mt={'10'}
        >
          Resume Pendaftaran Online Rawat Jalan
        </Text>
        <Text
          color="#072051"
          fontWeight={700}
          textAlign={'center'}
          fontSize={'24px'}
          mb={'10'}
        >
          No.{no_antrian}
        </Text>
        <TableContainer variant="striped">
          <Table>
            <Tbody>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Nama</Td>
                <Td>{nama}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Jenis Kelamin</Td>
                <Td>{jenis_kelamin}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>No Telepon</Td>
                <Td>{no_telpon}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Email</Td>
                <Td>{email}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Rumah Sakit</Td>
                <Td>{hospital}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Poliklinik</Td>
                <Td>{policlinic}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Dokter Pilihan</Td>
                <Td>{doctor}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Tanggal Periksa</Td>
                <Td>{practice_date}</Td>
              </Tr>
              <Tr fontWeight={'400'} textAlign="start" fontSize={'18px'}>
                <Td fontWeight={'600'}>Jam Periksa</Td>
                <Td>{practice_time}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}