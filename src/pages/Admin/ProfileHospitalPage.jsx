import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import PopupAdmin from '../../components/PopupAdmin';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  kontak: yup.string().required('Harap masukkan kontak RS').min(5, 'Masukkan nomor yang sesuai'),
});

function ProfileHospitalPage() {
  const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <LayoutAdmin activeMenu={'hospital'}>
      <Stack>
        <Flex
          alignItems={'center'}
          justify={{ sm: 'space-between' }}
          gap={'3'}
          px={{ base: '8', sm: '8', md: '8', lg: '10' }}
          bg="white"
          py={{ base: '5', sm: '5', md: '10' }}
          borderBottom="4px"
          borderColor="#FAFAFA"
          textAlign={{ base: 'center', sm: 'left' }}
          wrap={'wrap'}
        >
          <Box>
            <Text fontSize={'20px'} fontWeight={'600'} color={'#1FA8F6'}>
              Profil Rumah Sakit
            </Text>
          </Box>
          <Button onClick={onOpenModalEdit} color={'#15192080'}>
            Edit
          </Button>
        </Flex>
        <Stack bg={'white'} px={{ base: '5', sm: '5', md: '10' }} py={{ base: '5', sm: '10', md: '16', lg: '20' }}>
          <Box p={'5'} border={'1px'} borderColor={'#E5E5E5'} width={{ base: '250px', sm: '350px', md: '500px', lg: '600px' }} borderRadius={'xl'}>
            <Image src="/src/assets/images/profil_1.jpg" borderRadius={'xl'} />
          </Box>
          <Box maxWidth={'500px'}>
            <Text fontWeight={'700'} color={'#072051'} fontSize={{ base: '18px', sm: '20px', md: '24px' }}>
              RS Haji Surabaya
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px', md: '20px' }} color={'#B0B0B0'}>
              Jalan Manyar Kertoadi No 13, Klampisngasem, Kec. Sukolilo, Kota Surabaya, Jawa Timur 60116
            </Text>
            <Text fontWeight={'700'} color={'#072051'} fontSize={{ base: '18px', sm: '20px', md: '24px' }}>
              Kontak:
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px', md: '20px' }} color={'#B0B0B0'}>
              031592000
            </Text>
            <Text fontWeight={'700'} color={'#072051'} fontSize={{ base: '18px', sm: '20px', md: '24px' }}>
              Jam Buka:
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px', md: '20px' }} color={'#B0B0B0'}>
              Buka 24 Jam
            </Text>
          </Box>
        </Stack>
      </Stack>
      <PopupAdmin
        isOpen={isOpenModalEdit}
        onClose={onCloseModalEdit}
        modalTitle={'Edit Data'}
        modalBody={
          <>
            <FormControl>
              <FormLabel color={'#CDD1E0'}>Nama Rumah Sakit</FormLabel>
              {/* <Input placeholder='Nama Rumah Sakit' id="nama" type='text' value={'RS Haji Surabaya'} disabled/> */}
              <Text>RS Haji Surabaya</Text>
              {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={'#CDD1E0'}>Kontak</FormLabel>
              <Input {...register('kontak')} placeholder="Kontak Rumah Sakit" type={'number'} id="kontak" />
              <Text color="red">{errors.password?.message}</Text>
              {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={'#CDD1E0'}>Jam Operasional</FormLabel>
              <Input placeholder="Jam Operasional Rumah Sakit" type={'text'} id="jam_operasional" />
              {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
            </FormControl>
          </>
        }
      />
    </LayoutAdmin>
  );
}

export default ProfileHospitalPage;
