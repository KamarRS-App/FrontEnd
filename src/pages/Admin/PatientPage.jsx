import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdmin from '../../components/LayoutAdmin';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import PopupAdmin from '../../components/PopupAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';

const PatientPage = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();
    return (
        <LayoutAdmin activeMenu={'patient'}>
            <HeadAdmin
                title={'Manajemen Pasien'}
                isAdd={onModalCreateOpen}
            />
            <Box
            >
                <TableAdmin
                    headTable={
                        <Tr>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Action
                            </Td>
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
                                Nama Pasien
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                ID Pasien
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Status
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Ruangan
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                KTP
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Kontak Pasien
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Nama Wali
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Kontak Wali
                            </Td>
                        </Tr>
                    }
                    bodyTable={
                        data.map(data => (
                            <Tr>
                                <Td
                                    textAlign={'center'}
                                >
                                    <ButtonGroup gap='4'>
                                        <Button
                                            onClick={onModalEditOpen}
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
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.no}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.nama_pasien}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.id_pasien}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.status}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.ruangan}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.ktp}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.kontak_pasien}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.nama_wali}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.kontak_wali}
                                </Td>
                            </Tr>
                        ))
                    }
                />
            </Box>
            <PopupAdmin
                modalTitle={'Tambah Data Pasien'}
                isOpen={isModalCreateOpen}
                onClose={onCloseModalCreate}
                modalBody={
                    <>
                    <FormControl>
                            <FormLabel>Nama Pasien</FormLabel>
                            <Input placeholder='Nama Pasien' id="name" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>KTP Pasien</FormLabel>
                            <Input placeholder='No KTP Pasien' type={'text'} id='ktp' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kontak Pasien</FormLabel>
                            <Input placeholder='Kontak Pasien' type={'text'} id='kontak_pasien' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kontak Pasien</FormLabel>
                            <Input placeholder='Kontak Pasien' type={'text'} id='kontak_pasien' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select placeholder='Ubah Status' id='status'>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Ruangan</FormLabel>
                            <Select placeholder='Pilih Ruang' id='ruang'>
                                <option>Presidential</option>
                                <option>Luxury</option>
                                <option>Deluxe</option>
                                <option>Superior</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Nama Wali Pasien</FormLabel>
                            <Input placeholder='Nama Wali Pasien' type={'text'} id='nama_wali' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kontak Wali Pasien</FormLabel>
                            <Input placeholder='Kontak Wali Pasien' type={'text'} id='kontak_wali' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />
            <PopupAdmin
                modalTitle={'Ubah Data Pasien'}
                isOpen={isModalEditOpen}
                onClose={onCloseModalEdit}
                modalBody={
                    <>
                    <FormControl>
                            <FormLabel>Nama Pasien</FormLabel>
                            <Input placeholder='Nama Pasien' id="name" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>KTP Pasien</FormLabel>
                            <Input placeholder='No KTP Pasien' type={'text'} id='ktp' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kontak Pasien</FormLabel>
                            <Input placeholder='Kontak Pasien' type={'text'} id='kontak_pasien' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kontak Pasien</FormLabel>
                            <Input placeholder='Kontak Pasien' type={'text'} id='kontak_pasien' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select placeholder='Ubah Status' id='status'>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Ruangan</FormLabel>
                            <Select placeholder='Pilih Ruang' id='ruang'>
                                <option>Presidential</option>
                                <option>Luxury</option>
                                <option>Deluxe</option>
                                <option>Superior</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Nama Wali Pasien</FormLabel>
                            <Input placeholder='Nama Wali Pasien' type={'text'} id='nama_wali' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kontak Wali Pasien</FormLabel>
                            <Input placeholder='Kontak Wali Pasien' type={'text'} id='kontak_wali' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />
        </LayoutAdmin>
    );
}


const data = [
    {
        no: 1,
        nama_pasien: 'Almira',
        id_pasien: '#123FEBGV',
        status: 'rawat inap',
        ruangan: 'presidential',
        ktp: '100-233-112',
        kontak_pasien: '085646087878',
        nama_wali: 'Farid Hendra',
        kontak_wali: '0856460876767'
    },
    {
        no: 2,
        nama_pasien: 'Almira',
        id_pasien: '#123FEBGV',
        status: 'rawat jalan',
        ruangan: 'tidak ada info',
        ktp: '100-233-112',
        kontak_pasien: '085646087878',
        nama_wali: 'Farid Hendra',
        kontak_wali: '0856460876767'
    },
    {
        no: 3,
        nama_pasien: 'Almira',
        id_pasien: '#123FEBGV',
        status: 'verifikasi',
        ruangan: 'tidak ada info',
        ktp: '100-233-112',
        kontak_pasien: '085646087878',
        nama_wali: 'Farid Hendra',
        kontak_wali: '0856460876767'
    }
]

export default PatientPage;
