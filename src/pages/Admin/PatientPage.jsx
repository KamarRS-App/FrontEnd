import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Stack } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React, { useState } from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdmin from '../../components/LayoutAdmin';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import PopupAdmin from '../../components/PopupAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { Radio, RadioGroup } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const PatientPage = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();

    const initialValues = {
        nama: '',
        no_kk: '',
        no_ktp: '',
        jenis_kelamin: '',
        usia: '',
        tanggal_lahir: '',
        nama_wali: '',
        no_telpone_wali: '',
        email_wali: '',
        alamat_ktp: '',
        kabupaten_kota_ktp: '',
        provinsi_ktp: '',
        no_bpjs: '',
        kelas_bpjs: '',
        foto_ktp: '',
        foto_bpjs: '',
    };

    const editValues = {
        nama: 'mitro',
        no_kk: "2123452344567788",
        no_ktp: "2345671234456788",
        jenis_kelamin: 'laki-laki',
        usia: '23',
        tanggal_lahir: '12/4/1987',
        nama_wali: 'Ubai',
        no_telpone_wali: '0877654421',
        email_wali: 'uai@sd.s',
        alamat_ktp: 'Blitar',
        kabupaten_kota_ktp: 'Kota Blitar',
        provinsi_ktp: 'Jawa Timur',
        no_bpjs: '',
        kelas_bpjs: '',
        foto_ktp: 'ktp.jpg',
        foto_bpjs: '',
    };

    const [initialValue, setInitialValue] = useState(initialValues);
    const [editValue, setEditValue] = useState(editValues);

    const schema = Yup.object().shape({
        nama: Yup.string().required('Nama tidak boleh Kosong'),
        no_kk: Yup.string().max(16, 'Nomor KK tidak sesuai, max 16 digit').min(16, 'Nomor KK tidak sesuai, min 16 digit').required('Nomor KK wajib di isi'),
        no_ktp: Yup.string().max(16, 'NIK tidak sesuai, max 16 digit').min(16, 'NIK tidak sesuai, min 16 digit').required('NIK wajib di isi'),
        jenis_kelamin: Yup.string().required('Jenis Kelamin wajib diisi'),
        usia: Yup.string().max(2, 'usia melebihi batas').required('Usia Wajib diisi'),
        tanggal_lahir: Yup.date().required('Tanggal Lahir wajib diisi'),
        nama_wali: Yup.string().required('Nama Wali tidak boleh kosong'),
        no_telpone_wali:  Yup.string().min(11, 'Nomor hp belum lengkap').max(13, 'Nomor HP salah, melebihi batas normal').required('Nomor hp wajib diisi'),
        email_wali: Yup.string().email('Email tidak sesuai').required('Email wajib diisi'),
        alamat_ktp: Yup.string().required('Alamat tidak boleh kosong'),
        kabupaten_kota_ktp: Yup.string().required('Pilih Kota / Kabupaten'),
        provinsi_ktp: Yup.string().required('Pilih Provinsi'),
        no_bpjs: Yup.string(),
        kelas_bpjs: Yup.string(),
        foto_ktp: Yup.string().required('Foto KTP wajib diupload'),
        foto_bpjs: Yup.string(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: initialValue
    })

    const { register:editPatient, handleSubmit:submitEditPatient, formState: { errors:errorsPatient } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: editValue
    })

    const submitButton = (e) => {
        // e.preventDefault();
        console.log("Values::::", e)
    };

    const onError = (error) => {
        console.log(error)
    }

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
                                No KK
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                No KTP
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Jenis Kelamin
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Usia
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
                                No Telpon Wali
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Alamat Sesuai KTP
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Tanggal Lahir
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                No BPJS
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Kelas BPJS
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Foto KTP
                            </Td>
                            <Td
                                fontWeight={'400'}
                                textAlign='center'
                                fontSize={'18px'}
                            >
                                Foto BPJS
                            </Td>
                        </Tr>
                    }
                    bodyTable={
                        data.map(data => (
                            <Tr key={data.no}>
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
                                    {data.no_kk}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.nik}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.jenis_kelamin}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.usia}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.nama_wali}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.no_telepone_wali}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.alamat_ktp + "," + data.kabupaten_kota_ktp + "," + data.provinsi_ktp}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.tanggal_lahir}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.no_bpjs}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.kelas_bpjs}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.foto_ktp}
                                </Td>
                                <Td
                                    textAlign={'center'}
                                >
                                    {data.foto_bpjs}
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
                submitButton={handleSubmit(submitButton, onError)}
                modalBody={
                    <>
                        <FormControl isInvalid={errors.nama}>
                            <FormLabel>Nama Pasien</FormLabel>
                            <Input placeholder='Nama Pasien' id="name" type='text' {...register('nama')}/>
                            {errors.nama && <FormErrorMessage>{errors.nama.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.no_kk}>
                            <FormLabel>No KK</FormLabel>
                            <Input placeholder='No KK Pasien' type={'text'} id='kk' {...register('no_kk')}/>
                            {errors.no_kk && <FormErrorMessage>{errors.no_kk.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.no_ktp}>
                            <FormLabel>KTP Pasien</FormLabel>
                            <Input placeholder='No KTP Pasien' type={'text'} id='ktp' {...register('no_ktp')}/>
                            {errors.no_ktp && <FormErrorMessage>{errors.no_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.jenis_kelamin}>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <RadioGroup {...register('jenis_kelamin')}>
                                <Stack direction='row'>
                                    <Radio value='Laki-Laki'>Laki-Laki</Radio>
                                    <Radio value='Perempuan'>Perempuan</Radio>
                                </Stack>
                            </RadioGroup>
                            {errors.jenis_kelamin && <FormErrorMessage>{errors.jenis_kelamin.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.usia}>
                            <FormLabel>Usia</FormLabel>
                            <Input placeholder='Usia Pasien' type={'number'} id='usia' {...register('usia')}/>
                            {errors.usia && <FormErrorMessage>{errors.usia.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.tanggal_lahir}>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <Input placeholder='Tanggal Lahir Pasien' type={'date'} id='tanggal_lahir' {...register('tanggal_lahir')} />
                            {errors.tanggal_lahir && <FormErrorMessage>{errors.tanggal_lahir.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.nama_wali}>
                            <FormLabel>Nama Wali</FormLabel>
                            <Input placeholder='Nama Wali Pasien' type={'text'} id='nama_wali' {...register('nama_wali')} />
                            {errors.nama_wali && <FormErrorMessage>{errors.nama_wali.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.no_telpone_wali}>
                            <FormLabel>No Telpon Wali</FormLabel>
                            <Input placeholder='Nomor Telpone Wali' type={'text'} id='no_telpone_wali' {...register('no_telpone_wali')} />
                            {errors.no_telpone_wali && <FormErrorMessage>{errors.no_telpone_wali.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.email_wali}>
                            <FormLabel>Email Wali</FormLabel>
                            <Input placeholder='Email Wali' type={'email'} id='email_wali' {...register('email_wali')} />
                            {errors.email_wali && <FormErrorMessage>{errors.email_wali.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.alamat_ktp}>
                            <FormLabel>Alamat Pasien (Sesuai KTP)</FormLabel>
                            <Input placeholder='Alamat' type={'text'} id='alamat_ktp' {...register('alamat_ktp')}/>
                            {errors.alamat_ktp && <FormErrorMessage>{errors.alamat_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.provinsi_ktp}>
                            <FormLabel>Provinsi</FormLabel>
                            <Select placeholder='Pilih Provinsi' id='provinsi' {...register('provinsi_ktp')}>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {errors.provinsi_ktp && <FormErrorMessage>{errors.provinsi_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.kabupaten_kota_ktp}>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <Select placeholder='Pilih Kabupaten / Kota' id='kabupaten_kota' {...register('kabupaten_kota_ktp')}>
                                <option>Presidential</option>
                                <option>Luxury</option>
                                <option>Deluxe</option>
                                <option>Superior</option>
                            </Select>
                            {errors.kabupaten_kota_ktp && <FormErrorMessage>{errors.kabupaten_kota_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.no_bpjs}>
                            <FormLabel>No BPJS</FormLabel>
                            <Input placeholder='Nomor BPJS' type={'text'} id='no_bpjs' {...register('no_bpjs')}/>
                            {errors.no_bpjs && <FormErrorMessage>{errors.no_bpjs.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.kelas_bpjs}>
                            <FormLabel>Kelas BPJS</FormLabel>
                            <Select placeholder='Pilih Kelas BPJS' id='kelas_bpjs' {...register('kelas_bpjs')}>
                                <option>Presidential</option>
                                <option>Luxury</option>
                                <option>Deluxe</option>
                                <option>Superior</option>
                            </Select>
                            {errors.kelas_bpjs && <FormErrorMessage>{errors.kelas_bpjs.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.foto_ktp}>
                            <FormLabel>Foto KTP</FormLabel>
                            <Input type={'file'} id='foto_ktp' {...register('foto_ktp')}/>
                            {errors.foto_ktp && <FormErrorMessage>{errors.foto_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errors.foto_bpjs}>
                            <FormLabel>Foto BJPS</FormLabel>
                            <Input type={'file'} id='foto_bpjs' {...register('foto_bpjs')}/>
                            {errors.foto_bpjs && <FormErrorMessage>{errors.foto_bpjs.message}</FormErrorMessage>}
                        </FormControl>

                    </>
                }
            />
            <PopupAdmin
                modalTitle={'Ubah Data Pasien'}
                isOpen={isModalEditOpen}
                onClose={onCloseModalEdit}
                submitButton={submitEditPatient(submitButton, onError)}
                modalBody={
                    <>
                        <FormControl isInvalid={errorsPatient.nama}>
                            <FormLabel>Nama Pasien</FormLabel>
                            <Input placeholder='Nama Pasien' id="name" type='text' {...editPatient('nama')}/>
                            {errorsPatient.nama && <FormErrorMessage>{errorsPatient.nama.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.no_kk}>
                            <FormLabel>No KK</FormLabel>
                            <Input placeholder='No KK Pasien' type={'text'} id='kk' {...editPatient('no_kk')} />
                            {errorsPatient.no_kk && <FormErrorMessage>{errorsPatient.no_kk.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.no_ktp}>
                            <FormLabel>KTP Pasien</FormLabel>
                            <Input placeholder='No KTP Pasien' type={'text'} id='ktp' {...editPatient('no_ktp')} />
                            {errorsPatient.no_ktp && <FormErrorMessage>{errorsPatient.no_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.jenis_kelamin}>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <RadioGroup {...editPatient('jenis_kelamin')}>
                                <Stack direction='row'>
                                    <Radio value='Laki-Laki'>Laki-Laki</Radio>
                                    <Radio value='Perempuan'>Perempuan</Radio>
                                </Stack>
                            </RadioGroup>
                            {errorsPatient.jenis_kelamin && <FormErrorMessage>{errorsPatient.jenis_kelamin.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.usia}>
                            <FormLabel>Usia</FormLabel>
                            <Input placeholder='Usia Pasien' type={'number'} id='usia' {...editPatient('usia')} />
                            {errorsPatient.usia && <FormErrorMessage>{errorsPatient.usia.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.tanggal_lahir}>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <Input placeholder='Tanggal Lahir Pasien' type={'date'} id='tanggal_lahir' {...editPatient('tanggal_lahir')} />
                            {errorsPatient.tanggal_lahir && <FormErrorMessage>{errorsPatient.tanggal_lahir.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.nama_wali}>
                            <FormLabel>Nama Wali</FormLabel>
                            <Input placeholder='Nama Wali Pasien' type={'text'} id='nama_wali' {...editPatient('nama_wali')} />
                            {errorsPatient.nama_wali && <FormErrorMessage>{errorsPatient.nama_wali.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.no_telepone_wali}>
                            <FormLabel>No Telpon Wali</FormLabel>
                            <Input placeholder='Nomor Telpone Wali' type={'text'} id='no_telpone_wali' {...editPatient('no_telpone_wali')} />
                            {errorsPatient.no_telpone_wali && <FormErrorMessage>{errorsPatient.no_telpone_wali.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.alamat_ktp}>
                            <FormLabel>Alamat Pasien (Sesuai KTP)</FormLabel>
                            <Input placeholder='Alamat' type={'text'} id='alamat_ktp' {...editPatient('alamat_ktp')} />
                            {errorsPatient.alamat_ktp && <FormErrorMessage>{errorsPatine.alamat_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.provinsi_ktp}>
                            <FormLabel>Provinsi</FormLabel>
                            <Select placeholder='Pilih Provinsi' id='provinsi' {...editPatient('provinsi_ktp')}>
                                <option>rawat inap</option>
                                <option>rawat jalan</option>
                                <option>verifikasi</option>
                                <option>pendaftaran</option>
                                <option>selesai</option>
                            </Select>
                            {errorsPatient.provinsi_ktp && <FormErrorMessage>{errorsPatient.provinsi_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.kabupaten_kota_ktp}>
                            <FormLabel>Kabupaten / Kota</FormLabel>
                            <Select placeholder='Pilih Kabupaten / Kota' id='kabupaten_kota' {...editPatient('kabupaten_kota_ktp')} >
                                <option>Presidential</option>
                                <option>Luxury</option>
                                <option>Deluxe</option>
                                <option>Superior</option>
                            </Select>
                            {errorsPatient.kabupaten_kota_ktp && <FormErrorMessage>{errorsPatient.kabupaten_kota_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.no_bpjs}>
                            <FormLabel>No BPJS</FormLabel>
                            <Input placeholder='Nomor BPJS' type={'text'} id='no_bpjs' {...editPatient('no_bpjs')} />
                            {errorsPatient.no_bpjs && <FormErrorMessage>{errorsPatient.no_bpjs.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.kelas_bpjs}>
                            <FormLabel>Kelas BPJS</FormLabel>
                            <Select placeholder='Pilih Kelas BPJS' id='kelas_bpjs' {...editPatient('kelas_bpjs')} >
                                <option>Presidential</option>
                                <option>Luxury</option>
                                <option>Deluxe</option>
                                <option>Superior</option>
                            </Select>
                            {errorsPatient.kelas_bpjs && <FormErrorMessage>{errorsPatient.kelas_bpjs.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.foto_ktp}>
                            <FormLabel>Foto KTP</FormLabel>
                            <Input type={'file'} id='foto_ktp' {...editPatient('foto_ktp')} />
                            {errorsPatient.foto_ktp && <FormErrorMessage>{errorsPatient.foto_ktp.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsPatient.foto_bpjs}>
                            <FormLabel>Foto BJPS</FormLabel>
                            <Input type={'file'} id='foto_bpjs' {...editPatient('foto_bpjs')} />
                            {errorsPatient.foto_bpjs && <FormErrorMessage>{errorsPatient.foto_bpjs.message}</FormErrorMessage>}
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
        id_pasien: '#123FEBGV',
        nama_pasien: 'Almira',
        usia: '20',
        no_kk: '22345678882',
        nik: '100-233-112',
        jenis_kelamin: 'perempuan',
        nama_wali: 'Farid Hendra',
        no_telepone_wali: '0856460876767',
        alamat_ktp: 'surabaya',
        provinsi_ktp: 'jawa timur',
        kabupaten_kota_ktp: 'surabaya',
        tanggal_lahir: '1990-02-01',
        no_bpjs: '234567',
        kelas_bpjs: 'I',
        foto_ktp: 'foto',
        foto_bpjs: 'foto',
    },
    {
        no: 2,
        id_pasien: '#123FEBGV',
        nama_pasien: 'Almira',
        usia: '20',
        no_kk: '22345678882',
        nik: '100-233-112',
        jenis_kelamin: 'perempuan',
        nama_wali: 'Farid Hendra',
        no_telepone_wali: '0856460876767',
        alamat_ktp: 'surabaya',
        provinsi_ktp: 'jawa timur',
        kabupaten_kota_ktp: 'surabaya',
        tanggal_lahir: '1990-02-01',
        no_bpjs: '234567',
        kelas_bpjs: 'I',
        foto_ktp: 'foto',
        foto_bpjs: 'foto',
    },
]

export default PatientPage;
