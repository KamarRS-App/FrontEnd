import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdminRoot from '../../components/LayoutAdminRoot';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import PopupAdmin from '../../components/PopupAdmin';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Grid } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';

const HospitalRootPages = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();
    return (
        <LayoutAdminRoot activeMenu={'hospital'}>
            <HeadAdmin title={'Akun Rumah Sakit'} isAdd={onModalCreateOpen} />
            <TableAdmin
                headTable={
                    <Tr>
                        {/* <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            No
                        </Td> */}
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Actions
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Kode RS
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Nama Rumah Sakit
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Foto
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Alamat
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            No Telpon
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
                            Kelas RS
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Pemilik/Pengelola
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Jumlah Tempat Tidur
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Status Rumah Sakit
                        </Td>
                        <Td
                            fontWeight={'400'}
                            textAlign='center'
                            fontSize={'18px'}
                        >
                            Biaya Pendaftaran
                        </Td>
                    </Tr>
                }
                bodyTable={
                    DataRs.map(data => (
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
                                {data.kode_rs}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.nama}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.foto}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.alamat + " " + data.kecamatan + " " + data.kabupaten_kota + " " + data.provinsi}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.no_telepon}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.email}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.kelas_rs}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.pemilik_pengelola}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.jumlah_tempat_tidur}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                {data.status_penggunaan}
                            </Td>
                            <Td
                                textAlign={'center'}
                            >
                                Rp. {data.biaya_pendaftaran}
                            </Td>
                        </Tr>
                    ))
                }
            />
            <PopupAdmin
                modalTitle={'Tambah Akun Rumah Sakit'}
                isOpen={isModalCreateOpen}
                onClose={onCloseModalCreate}
                modalBody={
                    <>
                        <FormControl>
                            <FormLabel>Kode Rumah Sakit</FormLabel>
                            <Input placeholder='Kode Rumah Sakit' id="kode_rs" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Nama Rumah Sakit</FormLabel>
                            <Input placeholder='Nama Rumah Sakit' id="nama" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Alamat Rumah Sakit</FormLabel>
                            <Input placeholder='Alamat Rumah Sakit' id="alamat" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <Grid
                            templateColumns={'repeat(2, 1fr)'}
                            gap={'6'}
                            mt={'4'}
                        >
                            <FormControl>
                                <FormLabel>Provinsi</FormLabel>
                                <Select placeholder='Provinsi' id='provinsi'>
                                    <option>rawat inap</option>
                                    <option>rawat jalan</option>
                                    <option>verifikasi</option>
                                    <option>pendaftaran</option>
                                    <option>selesai</option>
                                </Select>
                                {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kabupaten / Kota</FormLabel>
                                <Select placeholder='Kabupaten/Kota' id='kabupaten_kota'>
                                    <option>rawat inap</option>
                                    <option>rawat jalan</option>
                                    <option>verifikasi</option>
                                    <option>pendaftaran</option>
                                    <option>selesai</option>
                                </Select>
                                {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kecamatan</FormLabel>
                                <Select placeholder='Kecamatan' id='kecamatan'>
                                    <option>rawat inap</option>
                                    <option>rawat jalan</option>
                                    <option>verifikasi</option>
                                    <option>pendaftaran</option>
                                    <option>selesai</option>
                                </Select>
                                {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kode Pos</FormLabel>
                                <Input placeholder='Kode Pos' id="kodepos" type='number' />
                                {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                            </FormControl>
                        </Grid>

                        <FormControl mt={'4'}>
                            <FormLabel>No Telpon</FormLabel>
                            <Input placeholder='Masukan Nomor Telpon Rumah Sakit' id="no_telpon" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>email</FormLabel>
                            <Input placeholder='Masukan Email Rumah Sakit' id="email" type='email' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Kelas Rumah Sakit</FormLabel>
                            <Select placeholder='Pilih Kelas Rumah Sakit' id='kelas_rs'>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Pemilik/Pengelola Rumah Sakit</FormLabel>
                            <Select placeholder='Pilih Pengelola Rumah Sakit' id='pemilik_pengelola'>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Jumlah Tempat Tidur Tersedia</FormLabel>
                            <Input placeholder='Masukan Jumlah Tempat Tidur Rumah Sakit' id="jumlah_tempat_tidur" type='number' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Status Penggunaan</FormLabel>
                            <Input placeholder='Status Penggunaan Rumah Sakit' id="status_penggunaan" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Biaya Pendaftaran</FormLabel>
                            <Input placeholder='Masukan Biaya Pendaftaran Rumah Sakit' id="biaya_pendaftaran" type='number' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Upload Foto Rumah Sakit</FormLabel>
                            <Input id="foto" type='file' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />

            <PopupAdmin
                modalTitle={'Edit Info Rumah Sakit'}
                isOpen={isModalEditOpen}
                onClose={onCloseModalEdit}
                modalBody={
                    <>
                        <FormControl>
                            <FormLabel>Kode Rumah Sakit</FormLabel>
                            <Input placeholder='Kode Rumah Sakit' id="kode_rs" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Nama Rumah Sakit</FormLabel>
                            <Input placeholder='Nama Rumah Sakit' id="nama" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Alamat Rumah Sakit</FormLabel>
                            <Input placeholder='Alamat Rumah Sakit' id="alamat" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <Grid
                            templateColumns={'repeat(2, 1fr)'}
                            gap={'6'}
                            mt={'4'}
                        >
                            <FormControl>
                                <FormLabel>Provinsi</FormLabel>
                                <Select placeholder='Provinsi' id='provinsi'>
                                    <option>rawat inap</option>
                                    <option>rawat jalan</option>
                                    <option>verifikasi</option>
                                    <option>pendaftaran</option>
                                    <option>selesai</option>
                                </Select>
                                {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kabupaten / Kota</FormLabel>
                                <Select placeholder='Kabupaten/Kota' id='kabupaten_kota'>
                                    <option>rawat inap</option>
                                    <option>rawat jalan</option>
                                    <option>verifikasi</option>
                                    <option>pendaftaran</option>
                                    <option>selesai</option>
                                </Select>
                                {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kecamatan</FormLabel>
                                <Select placeholder='Kecamatan' id='kecamatan'>
                                    <option>rawat inap</option>
                                    <option>rawat jalan</option>
                                    <option>verifikasi</option>
                                    <option>pendaftaran</option>
                                    <option>selesai</option>
                                </Select>
                                {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                            </FormControl>

                            <FormControl>
                                <FormLabel>Kode Pos</FormLabel>
                                <Input placeholder='Kode Pos' id="kodepos" type='number' />
                                {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                            </FormControl>
                        </Grid>

                        <FormControl mt={'4'}>
                            <FormLabel>No Telpon</FormLabel>
                            <Input placeholder='Masukan Nomor Telpon Rumah Sakit' id="no_telpon" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>email</FormLabel>
                            <Input placeholder='Masukan Email Rumah Sakit' id="email" type='email' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Kelas Rumah Sakit</FormLabel>
                            <Select placeholder='Pilih Kelas Rumah Sakit' id='kelas_rs'>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Pemilik/Pengelola Rumah Sakit</FormLabel>
                            <Select placeholder='Pilih Pengelola Rumah Sakit' id='pemilik_pengelola'>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Jumlah Tempat Tidur Tersedia</FormLabel>
                            <Input placeholder='Masukan Jumlah Tempat Tidur Rumah Sakit' id="jumlah_tempat_tidur" type='number' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Status Penggunaan</FormLabel>
                            <Input placeholder='Status Penggunaan Rumah Sakit' id="status_penggunaan" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Biaya Pendaftaran</FormLabel>
                            <Input placeholder='Masukan Biaya Pendaftaran Rumah Sakit' id="biaya_pendaftaran" type='number' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={'4'}>
                            <FormLabel>Upload Foto Rumah Sakit</FormLabel>
                            <Input id="foto" type='file' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />
        </LayoutAdminRoot>
    );
}

const DataRs = [
    {
        kode_rs: 2345,
        nama: "RSUD Dr. Iskhak",
        foto: "Foto",
        alamat: "Jalan Pramuka №55, Marga Jaya",
        provinsi: "Jawa Barat",
        kabupaten_kota: 'Kota Bekasi',
        kecamatan: 'Kec. Bekasi Selatan',
        no_telepon: '0321445',
        email: 'rsiskhak@mail.com',
        kelas_rs: 'Rumah Sakit Umum Kelas B',
        pemilik_pengelola: 'Pemprov',
        jumlah_tempat_tidur: '100',
        status_penggunaan: 'RSUD Provinsi',
        biaya_pendaftaran: 25000,
    },
    {
        kode_rs: 2323,
        nama: "RSUD Dr. Ismail",
        foto: "Foto",
        alamat: "Jalan Pramuka №55, Marga Jaya",
        provinsi: "Jawa Barat",
        kabupaten_kota: 'Kota Bekasi',
        kecamatan: 'Kec. Bekasi Selatan',
        no_telepon: '032235',
        email: 'rsIsmail@mail.com',
        kelas_rs: 'Rumah Sakit Umum Kelas A',
        pemilik_pengelola: 'Pemkot',
        jumlah_tempat_tidur: '100',
        status_penggunaan: 'RSUD Kota',
        biaya_pendaftaran: 25000,
    },
]

export default HospitalRootPages;
