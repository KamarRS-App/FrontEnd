import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Stack } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React, { useEffect, useState } from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdmin from '../../components/LayoutAdmin';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import PopupAdmin from '../../components/PopupAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { Radio, RadioGroup, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const PatientRegistrationPage = () => {
  const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  const toast = useToast();
  const navigate = useNavigate();

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
    no_kk: '2123452344567788',
    no_ktp: '2345671234456788',
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
    no_telpone_wali: Yup.string().min(11, 'Nomor hp belum lengkap').max(13, 'Nomor HP salah, melebihi batas normal').required('Nomor hp wajib diisi'),
    email_wali: Yup.string().email('Email tidak sesuai').required('Email wajib diisi'),
    alamat_ktp: Yup.string().required('Alamat tidak boleh kosong'),
    kabupaten_kota_ktp: Yup.string().required('Pilih Kota / Kabupaten'),
    provinsi_ktp: Yup.string().required('Pilih Provinsi'),
    no_bpjs: Yup.string(),
    kelas_bpjs: Yup.string(),
    foto_ktp: Yup.string().required('Foto KTP wajib diupload'),
    foto_bpjs: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const {
    register: editPatient,
    handleSubmit: submitEditPatient,
    formState: { errors: errorsPatient },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: editValue,
  });

  const submitButton = (e) => {
    // e.preventDefault();
    console.log('Values::::', e);
  };

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (role !== 'Admin - Staff' && token === undefined) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true,
      });
      navigate('/admin/login');
    }
  }, []);

  return (
    <LayoutAdmin activeMenu={'patient'}>
      <HeadAdmin title={'Manajemen Pasien'} />
      <Box>
        <TableAdmin
          headTable={
            <Tr>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                No
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Nama Pasien
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                ID Pasien
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                ID Tempat Tidur
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Nama Tempat Tidur
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Status Pasien
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Biaya Registrasi
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Kode Daftar
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Link Pembayaran
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Status Pembayaran
              </Td>
              <Td fontWeight={'400'} textAlign="center" fontSize={'18px'}>
                Action
              </Td>
            </Tr>
          }
          bodyTable={data.map((data) => (
            <Tr key={data.no}>
              <Td textAlign={'center'}>{data.no}</Td>
              <Td textAlign={'center'}>{data.nama_pasien}</Td>
              <Td textAlign={'center'}>{data.id_pasien}</Td>
              <Td textAlign={'center'}>{data.bed_id}</Td>
              <Td textAlign={'center'}>{data.nama_tempat_tidur}</Td>
              <Td textAlign={'center'}>{data.status_pasien}</Td>
              <Td textAlign={'center'}>{data.biaya_registrasi}</Td>
              <Td textAlign={'center'}>{data.kode_daftar}</Td>
              <Td textAlign={'center'}>{data.link_pembayaran}</Td>
              <Td textAlign={'center'}>{data.status_pembayaran}</Td>
              <Td textAlign={'center'}>
                <ButtonGroup gap="4">
                  <Button onClick={onModalEditOpen} bg="transparent" border="1px" borderColor={'#E0E0E0'}>
                    <MdModeEdit />
                  </Button>
                  <Button bg="transparent" border="1px" borderColor={'#E0E0E0'}>
                    <MdOutlineDeleteOutline />
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        />
      </Box>
      <PopupAdmin
        modalTitle={'Ubah Data Pasien'}
        isOpen={isModalEditOpen}
        onClose={onCloseModalEdit}
        submitButton={submitEditPatient(submitButton, onError)}
        modalBody={
          <>
            <FormControl isInvalid={errorsPatient.nama}>
              <FormLabel>Nama Pasien</FormLabel>
              <Input placeholder="Nama Pasien" id="name" type="text" {...editPatient('nama')} />
              {errorsPatient.nama && <FormErrorMessage>{errorsPatient.nama.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.no_kk}>
              <FormLabel>No KK</FormLabel>
              <Input placeholder="No KK Pasien" type={'text'} id="kk" {...editPatient('no_kk')} />
              {errorsPatient.no_kk && <FormErrorMessage>{errorsPatient.no_kk.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.no_ktp}>
              <FormLabel>KTP Pasien</FormLabel>
              <Input placeholder="No KTP Pasien" type={'text'} id="ktp" {...editPatient('no_ktp')} />
              {errorsPatient.no_ktp && <FormErrorMessage>{errorsPatient.no_ktp.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.jenis_kelamin}>
              <FormLabel>Jenis Kelamin</FormLabel>
              <RadioGroup {...editPatient('jenis_kelamin')}>
                <Stack direction="row">
                  <Radio value="Laki-Laki">Laki-Laki</Radio>
                  <Radio value="Perempuan">Perempuan</Radio>
                </Stack>
              </RadioGroup>
              {errorsPatient.jenis_kelamin && <FormErrorMessage>{errorsPatient.jenis_kelamin.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.usia}>
              <FormLabel>Usia</FormLabel>
              <Input placeholder="Usia Pasien" type={'number'} id="usia" {...editPatient('usia')} />
              {errorsPatient.usia && <FormErrorMessage>{errorsPatient.usia.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.tanggal_lahir}>
              <FormLabel>Tanggal Lahir</FormLabel>
              <Input placeholder="Tanggal Lahir Pasien" type={'date'} id="tanggal_lahir" {...editPatient('tanggal_lahir')} />
              {errorsPatient.tanggal_lahir && <FormErrorMessage>{errorsPatient.tanggal_lahir.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.nama_wali}>
              <FormLabel>Nama Wali</FormLabel>
              <Input placeholder="Nama Wali Pasien" type={'text'} id="nama_wali" {...editPatient('nama_wali')} />
              {errorsPatient.nama_wali && <FormErrorMessage>{errorsPatient.nama_wali.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.no_telepone_wali}>
              <FormLabel>No Telpon Wali</FormLabel>
              <Input placeholder="Nomor Telpone Wali" type={'text'} id="no_telpone_wali" {...editPatient('no_telpone_wali')} />
              {errorsPatient.no_telpone_wali && <FormErrorMessage>{errorsPatient.no_telpone_wali.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.alamat_ktp}>
              <FormLabel>Alamat Pasien (Sesuai KTP)</FormLabel>
              <Input placeholder="Alamat" type={'text'} id="alamat_ktp" {...editPatient('alamat_ktp')} />
              {errorsPatient.alamat_ktp && <FormErrorMessage>{errorsPatine.alamat_ktp.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.provinsi_ktp}>
              <FormLabel>Provinsi</FormLabel>
              <Select placeholder="Pilih Provinsi" id="provinsi" {...editPatient('provinsi_ktp')}>
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
              <Select placeholder="Pilih Kabupaten / Kota" id="kabupaten_kota" {...editPatient('kabupaten_kota_ktp')}>
                <option>Presidential</option>
                <option>Luxury</option>
                <option>Deluxe</option>
                <option>Superior</option>
              </Select>
              {errorsPatient.kabupaten_kota_ktp && <FormErrorMessage>{errorsPatient.kabupaten_kota_ktp.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.no_bpjs}>
              <FormLabel>No BPJS</FormLabel>
              <Input placeholder="Nomor BPJS" type={'text'} id="no_bpjs" {...editPatient('no_bpjs')} />
              {errorsPatient.no_bpjs && <FormErrorMessage>{errorsPatient.no_bpjs.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.kelas_bpjs}>
              <FormLabel>Kelas BPJS</FormLabel>
              <Select placeholder="Pilih Kelas BPJS" id="kelas_bpjs" {...editPatient('kelas_bpjs')}>
                <option>Presidential</option>
                <option>Luxury</option>
                <option>Deluxe</option>
                <option>Superior</option>
              </Select>
              {errorsPatient.kelas_bpjs && <FormErrorMessage>{errorsPatient.kelas_bpjs.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.foto_ktp}>
              <FormLabel>Foto KTP</FormLabel>
              <Input type={'file'} id="foto_ktp" {...editPatient('foto_ktp')} />
              {errorsPatient.foto_ktp && <FormErrorMessage>{errorsPatient.foto_ktp.message}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isInvalid={errorsPatient.foto_bpjs}>
              <FormLabel>Foto BJPS</FormLabel>
              <Input type={'file'} id="foto_bpjs" {...editPatient('foto_bpjs')} />
              {errorsPatient.foto_bpjs && <FormErrorMessage>{errorsPatient.foto_bpjs.message}</FormErrorMessage>}
            </FormControl>
          </>
        }
      />
    </LayoutAdmin>
  );
};

const data = [
  {
    no: 1,
    id_pasien: '#123FEBGV',
    nama_pasien: 'Almira',
    nama_tempat_tidur: 'melati',
    bed_id: 23,
    status_pasien: 'pemeriksaan awal',
    biaya_registrasi: 25000,
    kode_daftar: '#K654',
    link_pembayaran: 'midtrans',
    status_pembayaran: 'success',
  },
  {
    no: 2,
    id_pasien: '#123FEBGV',
    nama_pasien: 'Almira',
    nama_tempat_tidur: 'melati',
    bed_id: 23,
    status_pasien: 'pemeriksaan awal',
    biaya_registrasi: 25000,
    kode_daftar: '#K654',
    link_pembayaran: 'midtrans',
    status_pembayaran: 'success',
  },
];

export default PatientRegistrationPage;
