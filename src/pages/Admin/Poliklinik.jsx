import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdmin from '../../components/LayoutAdmin';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/hooks';
import PopupAdmin from '../../components/PopupAdmin';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import PopupDelete from '../../components/PopupDelete';
import HeadAdminPoli from '../../components/HeadAdminPoli';

const Poliklinik = () => {
  const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
  const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
  const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
  return (
    <LayoutAdmin activeMenu={'poli'}>
      <HeadAdminPoli title={'Manajemen Poliklinik'} isAdd={onModalCreateOpen} />
      <Box mt={'5'} py={'10'} bg="white">
        <TableAdmin
          headTable={
            <Tr>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                No
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Dokter
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Spesialis
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Email
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Telephone
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Jam Praktek
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Actions
              </Td>
            </Tr>
          }
          bodyTable={dataDoctor.map((doctor) => (
            <Tr>
              <Td textAlign={'center'}>{doctor.no}</Td>
              <Td textAlign={'center'}>{doctor.name}</Td>
              <Td textAlign={'center'}>{doctor.spesialis}</Td>
              <Td textAlign={'center'}>{doctor.email}</Td>
              <Td textAlign={'center'}>{doctor.telephone}</Td>
              <Td textAlign={'center'}>{doctor.jam_praktik}</Td>
              <Td textAlign="center">
                <ButtonGroup gap="4">
                  <Button onClick={onOpenModalEdit} bg="transparent" border="1px" borderColor={'#E0E0E0'}>
                    <MdModeEdit />
                  </Button>
                  <Button onClick={onOpenModalDelete} bg="transparent" border="1px" borderColor={'#E0E0E0'}>
                    <MdOutlineDeleteOutline />
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        />
      </Box>

      <PopupAdmin
        modalTitle={'Tambah Data Dokter'}
        isOpen={isModalCreateOpen}
        onClose={onCloseModalCreate}
        modalBody={
          <>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input placeholder="Nama Dokter" id="name" type="text" />
              {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Spesialis</FormLabel>
              <Input placeholder="Spesialis Dokter" type={'text'} id="spesialis" />
              {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email Dokter" type={'email'} id="email" />
              {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>No Telephone</FormLabel>
              <Input placeholder="Nomor Telephone Dokter" type={'text'} id="telephone" />
              {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
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

      <PopupDelete modalTitle={'Hapus Poli'} isOpen={isOpenModalDelete} onClose={onCloseModalDelete} modalBody={'Apakah anda yakin menghapus Poliklinik ini?'} deletet_name={'Hapus Poliklinik'} />
    </LayoutAdmin>
  );
};

const dataDoctor = [
  {
    no: 1,
    name: 'dr. Amrabat, Sp.A, M.Sc',
    spesialis: 'anak',
    email: 'amrabat@mail.com',
    telephone: '087665778990',
    jam_praktik: '08.00 - 11.00',
  },
  {
    no: 2,
    name: 'dr. Achraf Hakimi, Sp.An-KIC, FIP',
    spesialis: 'jantung',
    email: 'hakimi@mail.com',
    telephone: '087665778990',
    jam_praktik: '08.00 - 11.00',
  },
  {
    no: 3,
    name: 'dr. Ziyech Hakimi, Sp.An-KIC, FIP',
    spesialis: 'mata',
    email: 'ziyech@mail.com',
    telephone: '087665778990',
    jam_praktik: '08.00 - 11.00',
  },
];

export default Poliklinik;
