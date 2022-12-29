import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { data } from 'autoprefixer';
import React from 'react';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/hooks';
import { Select } from '@chakra-ui/react';
import { MdModeEdit } from 'react-icons/md';
import PopupAdmin from './PopupAdmin';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';

const HeadAdminPoli = ({ title, isAdd }) => {
  const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
  const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
  const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
  return (
    <Flex bg="white" p={{ base: '2', sm: '5', md: '10' }} wrap="wrap" justifyContent={{ base: 'center', sm: 'space-between' }}>
      <Text fontSize={'20px'} fontWeight={'600'} color={'#1FA8F6'}>
        {title}
      </Text>
      <Flex>
        <Box w={120} mt={2} ml={10}>
          <Text fontSize={'14px'} fontWeight={'500'} color={'#b0b0b0'}>
            Poli Gigi
          </Text>
        </Box>
        <Select placeholder="Pilih Poli">
          <option value="option1">Poli Gigi</option>
          <option value="option2">Poli Anak</option>
          <option value="option3">Poli Mata</option>
        </Select>
      </Flex>
      <Flex color={'#333333'} gap="5" pt={{ base: '5', sm: '0' }} width={{ base: '100%', sm: 'auto' }} justifyContent={'center'}>
        <ButtonGroup>
          <Button onClick={onModalCreateOpen} bg="transparent" border="1px" borderColor={'#E0E0E0'}>
            <IoAddOutline fontSize={'30px'} />
          </Button>
          <Button bg="transparent" border="1px" borderColor={'#E0E0E0'}>
            <CiSearch fontSize={'30px'} />
          </Button>
          <Button onClick={onOpenModalEdit} bg="transparent" border="1px" borderColor={'#E0E0E0'}>
            <MdModeEdit />
          </Button>
        </ButtonGroup>
      </Flex>
      <PopupAdmin
        modalTitle={'Tambah Poliklinik'}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        modalBody={
          <>
            <FormControl mt={4}>
              <FormLabel>Nama Poliklinik</FormLabel>
              <Input placeholder="Nama Poliklinik" id="name" type="text" />
              {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
            </FormControl>
          </>
        }
      />
      <PopupAdmin
        modalTitle={'Ubah Data Poli'}
        isOpen={isOpenModalEdit}
        onClose={onCloseModalEdit}
        modalBody={
          <>
            <FormControl>
              <FormLabel>Nama Poliklinik</FormLabel>
              <Input placeholder="Nama Poli" id="name" type="text" />
              {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
            </FormControl>
          </>
        }
      />
    </Flex>
  );
};

export default HeadAdminPoli;
