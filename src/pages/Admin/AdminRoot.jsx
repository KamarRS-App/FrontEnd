import { Button, ButtonGroup } from '@chakra-ui/button';
import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdminRoot from '../../components/LayoutAdminRoot';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import PopupAdmin from '../../components/PopupAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';

const AdminRoot = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();

    return (
        <LayoutAdminRoot activeMenu={'user'}>
            <HeadAdmin title={'Manajemen Akun Super Admin Rumah Sakit'} isAdd={onModalCreateOpen} />
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
                            Email
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Peran
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Rumah Sakit
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
                    dataAdmin.map(data => (
                        <>
                            <Td
                                textAlign={'center'}
                            >
                                {data.no}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.nama}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.email}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.peran}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.hospital_id}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                <ButtonGroup gap='4'>
                                    <Button
                                        // onClick={onModalEditOpen}
                                        bg='transparent'
                                        border='1px'
                                        borderColor={'#E0E0E0'}
                                    >
                                        <MdModeEdit />
                                    </Button>
                                    <Button
                                        bg='transparent'
                                        border='1px'
                                        borderColor={'#E0E0E0'}
                                    >
                                        <MdOutlineDeleteOutline />
                                    </Button>
                                </ButtonGroup>
                            </Td>
                        </>
                    ))
                }
            />
            <PopupAdmin
                modalTitle={'Tambahkan Akun Admin Rumah Sakit'}
                isOpen={isModalCreateOpen}
                onClose={onCloseModalCreate}
                modalBody={
                    <>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input placeholder='Nama' id="nama" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Email Address</FormLabel>
                            <Input placeholder='Email Address' id="email" type='email' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Jenis Akun</FormLabel>
                            <Select placeholder='Pilih Jenis Akun' id='peran'>
                                <option>Admin</option>
                                <option>Super Admin</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Rumah Sakit</FormLabel>
                            <Select placeholder='Pilih Rumah Sakit' id='hospital_id'>
                                <option>Rs</option>
                                <option>Super Admin</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />
        </LayoutAdminRoot>
    );
}

const dataAdmin = [
    {
        no: 1,
        nama: 'teguh',
        email: 'teguh@mail.com',
        peran: 'admin',
        hospital_id: 1
    }
]

export default AdminRoot;
