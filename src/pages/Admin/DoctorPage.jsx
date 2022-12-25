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

const DoctorPage = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
    return (
        <LayoutAdmin activeMenu={'doctor'}>
            <HeadAdmin title={'Manajemen Dokter'} isAdd={onModalCreateOpen} />
            <Box
                mt={'5'}
                py={'10'}
                bg='white'
            >
                <TableAdmin
                    headTable={
                        <Tr>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                No
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Nama
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Spesialis
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Email
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Telephone
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Actions
                            </Td>
                        </Tr>
                    }
                    bodyTable={
                        dataDoctor.map(doctor => (
                            <Tr>
                                <Td textAlign={'center'}>{doctor.no}</Td>
                                <Td textAlign={'center'}>{doctor.name}</Td>
                                <Td textAlign={'center'}>{doctor.spesialis}</Td>
                                <Td textAlign={'center'}>{doctor.email}</Td>
                                <Td textAlign={'center'}>{doctor.telephone}</Td>
                                <Td
                                    textAlign='center'
                                >
                                    <ButtonGroup gap='4'>
                                        <Button
                                            onClick={onOpenModalEdit}
                                            bg='transparent'
                                            border='1px'
                                            borderColor={'#E0E0E0'}
                                        >
                                            <MdModeEdit />
                                        </Button>
                                        <Button
                                            onClick={onOpenModalDelete}
                                            bg='transparent'
                                            border='1px'
                                            borderColor={'#E0E0E0'}
                                        >
                                            <MdOutlineDeleteOutline />
                                        </Button>
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        ))
                    }
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
                            <Input placeholder='Nama Dokter' id="name" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Spesialis</FormLabel>
                            <Input placeholder='Spesialis Dokter' type={'text'} id='spesialis' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email Dokter' type={'email'} id='email' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>No Telephone</FormLabel>
                            <Input placeholder='Nomor Telephone Dokter' type={'text'} id='telephone' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />

            <PopupAdmin
                modalTitle={'Ubah Data Dokter'}
                isOpen={isOpenModalEdit}
                onClose={onCloseModalEdit}
                modalBody={
                    <>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input placeholder='Nama Dokter' id="name" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Spesialis</FormLabel>
                            <Input placeholder='Spesialis Dokter' type={'text'} id='spesialis' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email Dokter' type={'email'} id='email' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>No Telephone</FormLabel>
                            <Input placeholder='Nomor Telephone Dokter' type={'text'} id='telephone' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />

            <PopupDelete 
                modalTitle={'Hapus Dokter'}
                isOpen={isOpenModalDelete}
                onClose={onCloseModalDelete}
                modalBody={'Apakah anda yakin menghapus dokter ini?'}
                deletet_name={'Hapus Dokter'}
            />
        </LayoutAdmin>
    );
}

const dataDoctor = [
    {
        no: 1,
        name: 'almira',
        spesialis: 'umum',
        email: 'almira@mail.com',
        telephone: '087665778990',
    },
    {
        no: 2,
        name: 'mira',
        spesialis: 'jantung',
        email: 'mira@mail.com',
        telephone: '087665778990',
    },
    {
        no: 3,
        name: 'almi',
        spesialis: 'mata',
        email: 'almi@mail.com',
        telephone: '087665778990',
    }
]

export default DoctorPage;
