import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';

const HeadAdminPoli = ({ title, onAdd, nama_poli, select_poli, onDelete, onEdit }) => {
  return (
    <Flex
      bg="white"
      p={{ base: '2', sm: '5', md: '10' }}
      wrap="wrap"
      justifyContent={{ base: 'center', sm: 'space-between' }}
    >
      <Text
        fontSize={'20px'}
        fontWeight={'600'}
        color={'#1FA8F6'}
      >
        {title}
      </Text>

      <Flex
        color={'#333333'}
        gap="5"
        pt={{ base: '5', sm: '0' }}
        width={{ base: '100%'}}
        justifyContent={'flex-end'}
        flexWrap={'wrap'}
      >
        <Box w={'auto'} mt={2}>
          <Text fontSize={'14px'} fontWeight={'500'} color={'#b0b0b0'}>
            {nama_poli}
          </Text>
        </Box>
        {select_poli}
        <ButtonGroup>
          <Button onClick={onAdd} bg="transparent" border="1px" borderColor={'#E0E0E0'}>
            <IoAddOutline fontSize={'30px'} />
          </Button>
          <Button bg="transparent" border="1px" borderColor={'#E0E0E0'}>
            <CiSearch fontSize={'30px'} />
          </Button>
          <Button bg="transparent" border="1px" borderColor={'#E0E0E0'} onClick={onEdit}>
            <MdModeEdit />
          </Button>
          <Button bg="transparent" border="1px" borderColor={'#E0E0E0'} onClick={onDelete}>
            <MdOutlineDeleteOutline />
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default HeadAdminPoli;
