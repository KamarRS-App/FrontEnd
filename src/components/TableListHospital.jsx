import React from 'react';
import { Box, Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Text, Select, Input, Button, InputLeftAddon, InputGroup } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const TableListHospital = ({ headTable, bodyTable, onChangeKota, onChangeProvinsi, provinsi, kota, valueProvinsi, valueKota }) => {
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
            <option value="all">Tampilkan semua</option>
            {
              provinsi?.map(data => (
                <option value={data.id} key={data.id}>{data.nama}</option>
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
            <option value="all">Tampilkan semua</option>
            {
              kota?.map(data => (
                <option value={data.nama} key={data.id}>{data.nama}</option>
              ))
            }
          </Select>
        </Box>
        <Button bg="#3AB8FF" color="white" _hover={{ bg: '#1FA8F6' }} width={{ base: 'full', md: 'auto' }}>
          <SearchIcon />
        </Button>
      </Flex>
      <Flex justify="flex-end" mt={'5'}>
        <InputGroup width={{ base: 'full', sm: 'full', md: '400px' }} shadow="md" borderRadius="md">
          <InputLeftAddon children={<SearchIcon />} />
          <Input placeholder="Cari Rumah Sakit" />
        </InputGroup>
      </Flex>
      <Flex gap="2" mt={'20'}>
        <Text fontWeight="bold">Surabaya</Text>
        <Text>ditemukan</Text>
        <Text fontWeight="bold">43</Text>
        <Text>Rumah Sakit</Text>
      </Flex>
      <TableContainer mt={{ base: '10', sm: '16', md: '20' }}>
        <Table variant="simple">
          <Thead>
            <>
              {headTable}
            </>
          </Thead>
          <Tbody>
            <>
              {bodyTable}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableListHospital;
