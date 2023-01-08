import React from 'react';
import { Box, Flex, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Select, Input, Button, Center } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import LoadingTable from './LoadingTable';

const TableListHospital = ({ nomor, hospitals, onChangeKota, onChangeProvinsi, provinsi, kota, valueProvinsi, valueKota, inputRef, onSearch, render }) => {
  return (
    <Box px="20">
      <Text fontWeight="600" fontSize={['30px', '38px']} mb={['10']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
        Daftar Rumah Sakit Mitra
      </Text>
      <Flex flexWrap="wrap" columnGap="4" rowGap="5" justify="flex-end">
        <Box width={{ base: 'full', sm: 'full', md: '250px', lg: '300px' }}>
          <Select
            placeholder="Provinsi"
            shadow="md"
            borderRadius="md"
            onChange={onChangeProvinsi}
            value={valueProvinsi}
          >
            {
              provinsi?.map(data => (
                <option value={data.id} key={data.id}>{data.name}</option>
              ))
            }
          </Select>
        </Box>
        <Box width={{ base: 'full', sm: 'full', md: '250px', lg: '300px' }}>
          <Select
            placeholder="Kabupaten/Kota"
            shadow="md"
            borderRadius="md"
            onChange={onChangeKota}
            value={valueKota}
          >
            {
              kota?.map(data => (
                <option value={data.id} key={data.id}>{data.name}</option>
              ))
            }
          </Select>
        </Box>
      </Flex>
      <Flex justify="flex-end" mt={'5'} gap={'2'}>
        <Input placeholder="Cari Rumah Sakit" maxWidth={'350px'} ref={inputRef} />
        <Button bg="#3AB8FF" color="white" _hover={{ bg: '#1FA8F6' }} width={{ base: 'full', md: 'auto' }} onClick={onSearch}>
          <SearchIcon />
        </Button>
      </Flex>
      <TableContainer mt={{ base: '10', sm: '16', md: '20' }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                No
              </Th>
              <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                Nama Rumah Sakit
              </Th>
              <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                Pemilik / Pengelola
              </Th>
              <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                No Telepon
              </Th>
              <Th color="alta.primary" fontWeight={' 700'} fontSize={'16px'}>
                Alamat
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {render &&
              <Tr>
                <Td
                  colSpan={'5'}
                  py={'16'}
                >
                  <Center
                    textAlign={'center'}
                  >
                    <LoadingTable />
                  </Center>
                </Td>
              </Tr>
            }
            {!render &&
              hospitals.map((data, index) => (
                <Tr key={index}>
                  <Td>{nomor + index + 1}</Td>
                  <Td
                    textDecoration={'underline'}
                    _hover={{ color: '#1FA8F6' }}
                  >
                    <Link
                      to={`/rumahsakit/${data.id}/detail`}
                    >
                      {data.nama}
                    </Link>
                  </Td>
                  <Td>{data.pemilik_pengelola}</Td>
                  <Td>{data.no_telpon}</Td>
                  <Td>{data.alamat + " " + data.kecamatan + " " + data.kabupaten_kota + ", " + data.provinsi + "," + data.kode_pos}</Td>
                </Tr>
              ))

            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableListHospital;
