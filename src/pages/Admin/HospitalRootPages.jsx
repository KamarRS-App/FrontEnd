import { Td, Tr } from '@chakra-ui/table';
import React, { useEffect, useRef, useState } from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdminRoot from '../../components/LayoutAdminRoot';
import TableAdmin from '../../components/TableAdmin';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import PopupAdmin from '../../components/PopupAdmin';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Grid } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import Cookies from 'js-cookie';
import { Image, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import axios from 'axios';
import PopupDelete from '../../components/PopupDelete';
import apiProvinsi from '../../services/apiProvinsi';
import { AuthToken } from '../../services/authToken';
import Loading from '../../components/Loading';
import Pagination from 'rc-pagination';

const HospitalRootPages = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();
    const { isOpen: isModalDeleteOpen, onOpen: onModalDeleteOpen, onClose: onCloseModalDelete } = useDisclosure();
    const role = Cookies.get('role');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const toast = useToast();
    const [hospitals, setHospitals] = useState([]);
    const [currentHospital, setCurrentHospital] = useState([]);
    const [hospitalImage, setHospitalImage] = useState();
    const [hospitalId, setHospitalId] = useState('');
    const [provinsi, setProvinsi] = useState([]);
    const [nameProvinsi, setNameProvinsi] = useState('');
    const [kota, setKota] = useState([]);
    const [nameKota, setNameKota] = useState('');
    const [kecamatan, setKecamatan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imagePrev, setImagePrev] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [nomor, setNomor] = useState(0);

    const auth = AuthToken();

    const initialValues = {
        kode_rs: '',
        nama: '',
        foto: '',
        alamat: '',
        provinsi: '',
        kabupaten_kota: '',
        kecamatan: '',
        kode_pos: '',
        no_telepon: '',
        email: '',
        kelas_rs: '',
        pemilik_pengelola: '',
        jumlah_tempat_tidur: null,
        status_penggunaan: '',
        biaya_registrasi: null,
    }

    const [initialValue, setInitialValue] = useState(initialValues);

    const schema = Yup.object().shape({
        kode_rs: Yup.string().required('Kode Rumah Sakit wajib diisi'),
        nama: Yup.string().required('Nama Rumah Sakit tidak boleh kosong'),
        foto: Yup.string().required('Foto tidak boleh kosong'),
        alamat: Yup.string().required('Alamat tidak boleh kosong'),
        provinsi: Yup.string().required('Provinsi tidak boleh kosong'),
        kabupaten_kota: Yup.string().required('Kabupaten/Kota tidak boleh kosong'),
        kecamatan: Yup.string().required('Kecamatan tidak boleh kosong'),
        kode_pos: Yup.string().required('Kode pos tidak boleh kosong'),
        no_telepon: Yup.string().min(9, 'Nomor salah').max(13, 'Nomor Salah').required('Nomor tidak boleh kosong'),
        email: Yup.string().email('Format Email salah').required('Email tidak boleh kosong'),
        kelas_rs: Yup.string().required('Kelas Rumah Sakit tidak boleh kosong'),
        pemilik_pengelola: Yup.string().required('Pemilik/Pengelola tidak boleh kosong'),
        jumlah_tempat_tidur: Yup.number('Harus Angka').required('Jumlah tempat tidur harus diisi'),
        status_penggunaan: Yup.string().required('Status rumah sakit wajib diisi'),
        biaya_registrasi: Yup.number('Harus Angka').required('Biaya registrasi wajib diisi'),
    })

    const { register: createHospital, handleSubmit, setValue: setValueCreate, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: initialValue,
    })

    const { register: updateHospital, handleSubmit: handleUpdate, formState: { errors: errorsUpdate }, setValue: setUpdate } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: initialValue,
    })

    //consume api

    const getHospitalHandler = async (id) => {
        await api.getHospitalByID(token, id)
            .then(response => {
                const data = response.data.data;
                setUpdate("nama", data.nama);
                setUpdate("foto", data.foto);
                setUpdate("kode_rs", data.kode_rs);
                setUpdate("alamat", data.alamat);
                setUpdate("kode_pos", data.kode_pos);
                setUpdate("no_telepon", data.no_telpon);
                setUpdate("email", data.email);
                setUpdate("kelas_rs", data.kelas_rs);
                setUpdate("jumlah_tempat_tidur", data.jumlah_tempat_tidur);
                setUpdate("pemilik_pengelola", data.pemilik_pengelola);
                setUpdate("biaya_registrasi", data.biaya_registrasi);
                setUpdate('status_penggunaan', data.status_penggunaan);
                setUpdate("provinsi", data.provinsi);
                setUpdate("kecamatan", data.kecamatan);
                setUpdate("kabupaten_kota", data.kabupaten_kota);
                setCurrentHospital(data)
            })
            .catch(error => {
                if (error) {
                    toast({
                        position: 'top',
                        title: 'Gagal Mendapatkan Data Rumah Sakit',
                        status: 'error',
                        duration: '1500',
                        isClosable: true
                    })
                }
            })
    }

    const getAllHospitalsHandler = async (pages) => {
        await api.getHospitals(token, pages)
            .then(response => {
                const data = response.data.data;
                setHospitals(data)
                setTotalPage(response.data.total_page)
            })
        setLoading(false);
    }

    const createHospitalHandler = async (data) => {
        await axios.post('https://rawatinap.online/hospitals', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                toast({
                    position: 'top',
                    title: 'Berhasil Menambahkan Data Rumah Sakit',
                    status: 'success',
                    duration: '1500',
                    isClosable: true
                })
                getAllHospitalsHandler();
                onCloseModalCreate();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal Menambahkan Data Rumah Sakit',
                    status: 'error',
                    duration: '1500',
                    isClosable: true
                })
                console.log(error)
            })
    }

    const updateHospitalHandler = async (data) => {
        await axios.put(`https://rawatinap.online/hospitals/${currentHospital.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                toast({
                    position: 'top',
                    title: 'Berhasil Menambahkan Data Rumah Sakit',
                    status: 'success',
                    duration: '1500',
                    isClosable: true
                })
                onCloseModalEdit();
                getAllHospitalsHandler();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal Menambahkan Data Rumah Sakit',
                    status: 'error',
                    duration: '1500',
                    isClosable: true
                })
            })
    }

    const deleteHospitalHandler = async (id) => {
        await api.deleteHospital(token, id)
            .then(response => {
                console.log(response.data)
                toast({
                    position: 'top',
                    title: 'Berhasil Menambahkan Data Rumah Sakit',
                    status: 'success',
                    duration: '1500',
                    isClosable: true
                })
                getAllHospitalsHandler();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal Menambahkan Data Rumah Sakit',
                    status: 'error',
                    duration: '1500',
                    isClosable: true
                })
            })
    }

    //api dearah
    const getProvinsi = async () => {
        await apiProvinsi.getProvinsi()
            .then((response) => {
                const data = response.data.value
                setProvinsi(data);
            });
    };

    const getKotaKabupatenByProvinsi = async (id) => {
        await apiProvinsi.getKotaKabupateByProvinsi(id)
            .then(response => {
                const data = response.data.value;
                setKota(data);
            })
    }

    const getKecamatanByKota = async (id) => {
        await apiProvinsi.getKecamatanByKota(id)
            .then(response => {
                const data = response.data.value;
                setKecamatan(data);
            })
    }

    //handler daerah
    const selectNameProvinsi = (id) => {
        provinsi.filter((data) => {
            if (data.id === id) {
                setNameProvinsi(data.name);
            }
        })
    }

    const selectNameKota = (id) => {
        kota.filter((data) => {
            if (data.id == id) {
                setNameKota(data.name);
            }
        })
    }

    const handlerProvinsi = (id) => {
        getKotaKabupatenByProvinsi(id);
        selectNameProvinsi(id);
    }

    const handlerKota = (id) => {
        selectNameKota(id);
        getKecamatanByKota(id);
    }

    //handler image
    const handleHospitalImage = (e) => {
        const file = e.target.files[0];
        setHospitalImage(file)
        setImagePrev(URL.createObjectURL(file));
    }

    const onHandlerEdit = (id) => {
        getHospitalHandler(id)
        if (currentHospital) {
            onModalEditOpen();
        }
    }

    const onSubmit = (values) => {
        const data = new FormData();
        data.append('kode_rs', values.kode_rs);
        data.append('nama', values.nama);
        data.append('alamat', values.alamat);
        data.append('provinsi', nameProvinsi);
        data.append('kabupaten_kota', nameKota);
        data.append('kecamatan', values.kecamatan);
        data.append('kode_pos', values.kode_pos);
        data.append('no_telpon', values.no_telepon);
        data.append('email', values.email);
        data.append('kelas_rs', values.kelas_rs);
        data.append('pemilik_pengelola', values.pemilik_pengelola);
        data.append('jumlah_tempat_tidur', values.jumlah_tempat_tidur);
        data.append('status_penggunaan', values.status_penggunaan);
        data.append('biaya_registrasi', values.biaya_registrasi);
        data.append('foto', hospitalImage);

        createHospitalHandler(data)
        setValueCreate("nama", '');
        setValueCreate("foto", '');
        setValueCreate("kode_rs", '');
        setValueCreate("alamat", '');
        setValueCreate("kode_pos", '');
        setValueCreate("no_telepon", '');
        setValueCreate("email", '');
        setValueCreate("kelas_rs", '');
        setValueCreate("jumlah_tempat_tidur", null);
        setValueCreate("pemilik_pengelola", '');
        setValueCreate("biaya_registrasi", null);
        setValueCreate('status_penggunaan', '');
        setValueCreate("provinsi", '');
        setValueCreate("kecamatan", '');
        setValueCreate("kabupaten_kota", '');
        setImagePrev('');
        onCloseModalCreate();
    }

    const onUpdateHandler = (values) => {
        const data = new FormData();

        data.append('kode_rs', values.kode_rs);
        data.append('nama', values.nama);
        data.append('alamat', values.alamat);
        data.append('provinsi', values.provinsi);
        data.append('kabupaten_kota', values.kabupaten_kota);
        data.append('kecamatan', values.kecamatan);
        data.append('kode_pos', values.kode_pos);
        data.append('no_telpon', values.no_telepon);
        data.append('email', values.email);
        data.append('kelas_rs', values.kelas_rs);
        data.append('pemilik_pengelola', values.pemilik_pengelola);
        data.append('jumlah_tempat_tidur', values.jumlah_tempat_tidur);
        data.append('status_penggunaan', values.status_penggunaan);
        data.append('biaya_registrasi', values.biaya_registrasi);
        data.append('foto', hospitalImage !== undefined && hospitalImage);

        updateHospitalHandler(data)
    }

    const onCloseHandler = () => {
        setHospitalImage(undefined);
        onCloseModalEdit();
    }

    const onCloseCreateHandler = () => {
        setValueCreate("nama", '');
        setValueCreate("foto", '');
        setValueCreate("kode_rs", '');
        setValueCreate("alamat", '');
        setValueCreate("kode_pos", '');
        setValueCreate("no_telepon", '');
        setValueCreate("email", '');
        setValueCreate("kelas_rs", '');
        setValueCreate("jumlah_tempat_tidur", null);
        setValueCreate("pemilik_pengelola", '');
        setValueCreate("biaya_registrasi", null);
        setValueCreate('status_penggunaan', '');
        setValueCreate("provinsi", '');
        setValueCreate("kecamatan", '');
        setValueCreate("kabupaten_kota", '');
        setImagePrev('');
        onCloseModalCreate();
    }

    const onDeleteClicked = (id) => {
        onModalDeleteOpen()
        setHospitalId(id);
    }

    const onDeleteHandler = () => {
        deleteHospitalHandler(hospitalId);
        onCloseModalDelete();
    }

    //filter
    const onPagination = (page) => {
        setCurrentPage(page)
        const selisih = currentPage - page;
        if (page === 1 || totalPage === 1) {
            setNomor(0);
        } else if (page === totalPage) {
            setNomor((totalPage * 10) - 10)
        }
        else {
            if (selisih < 0) {
                setNomor(Math.abs((selisih * 10) + nomor));
            } else if (selisih > 0) {
                setNomor(Math.abs((selisih * 10) - nomor));
            }
        }
    }

    useEffect(() => {
        if (role !== 'super admin' || !auth) {
            toast({
                position: 'top',
                title: 'Kamu Harus Login Dulu',
                status: 'warning',
                duration: '2000',
                isClosable: true
            })
            navigate('/root/login');
        }
        getAllHospitalsHandler(currentPage);
        getProvinsi();
    }, [currentPage]);

    return (
        <>
            {loading && <Loading body={'Sedang Memuat Data...'} />}
            {
                !loading &&
                <LayoutAdminRoot activeMenu={'hospital'}>
                    <HeadAdmin title={'Manajemen Rumah Sakit'} isAdd={onModalCreateOpen} />
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
                                    Actions
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
                                    Nama Rumah Sakit
                                </Td>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                    fontSize={'18px'}
                                >
                                    Kode Rumah Sakit
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
                            hospitals.length !== 0 ?
                                hospitals?.map((data, index) => (
                                    <Tr key={data.id}>
                                        <Td
                                            textAlign={'center'}
                                        >
                                            {nomor + index + 1}
                                        </Td>
                                        <Td
                                            textAlign={'center'}
                                        >
                                            <ButtonGroup gap='4'>
                                                <Button
                                                    onClick={() => onHandlerEdit(data.id)}
                                                    bg='transparent'
                                                    border='1px'
                                                    borderColor={'#E0E0E0'}
                                                >
                                                    <MdModeEdit />
                                                </Button>
                                                <Button
                                                    onClick={() => onDeleteClicked(data.id)}
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
                                            <Image
                                                src={data.foto}
                                                minWidth={'150px'}
                                                maxWidth={'300px'}
                                            />
                                        </Td>
                                        <Td
                                            textAlign={'center'}
                                        >
                                            {data.nama}
                                        </Td>
                                        <Td
                                            textAlign={'center'}
                                        >
                                            {data.kode_rs}
                                        </Td>
                                        <Td
                                            textAlign={'center'}
                                        >
                                            {data.alamat + ", kec." + data.kecamatan + ", " + data.kabupaten_kota + ", " + data.provinsi + ", " + data.kode_pos}
                                        </Td>
                                        <Td
                                            textAlign={'center'}
                                        >
                                            {data.no_telpon}
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
                                            Rp. {data.biaya_registrasi}
                                        </Td>
                                    </Tr>
                                ))
                                :
                                <Tr>
                                    <Td colSpan={'12'}
                                        textAlign={'center'}
                                    >
                                        Data Kosong
                                    </Td>
                                </Tr>
                        }
                    />
                    <Flex
                        justify={'end'}
                        mx={'20'}
                        mt={'8'}
                    >
                        <Pagination
                            defaultCurrent={'1'}
                            current={currentPage}
                            total={totalPage * 10}
                            onChange={onPagination}
                        />
                    </Flex>
                    <PopupAdmin
                        modalTitle={'Tambah Rumah Sakit'}
                        isOpen={isModalCreateOpen}
                        onClose={onCloseCreateHandler}
                        submitButton={handleSubmit(onSubmit)}
                        modalBody={
                            <>
                                <FormControl isInvalid={errors.kode_rs}>
                                    <FormLabel>Kode Rumah Sakit</FormLabel>
                                    <Input placeholder='Kode Rumah Sakit' id="kode_rs" type='text' {...createHospital('kode_rs')} />
                                    {errors.kode_rs && <FormErrorMessage>{errors.kode_rs.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.nama}>
                                    <FormLabel>Nama Rumah Sakit</FormLabel>
                                    <Input placeholder='Nama Rumah Sakit' id="nama" type='text' {...createHospital('nama')} />
                                    {errors.nama && <FormErrorMessage>{errors.nama.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.alamat}>
                                    <FormLabel>Alamat Rumah Sakit</FormLabel>
                                    <Input placeholder='Alamat Rumah Sakit' id="alamat" type='text' {...createHospital('alamat')} />
                                    {errors.alamat && <FormErrorMessage>{errors.alamat.message}</FormErrorMessage>}
                                </FormControl>

                                <Grid
                                    templateColumns={'repeat(2, 1fr)'}
                                    gap={'6'}
                                    mt={'4'}
                                >
                                    <FormControl isInvalid={errors.provinsi}>
                                        <FormLabel>Provinsi</FormLabel>
                                        <Select
                                            placeholder='Provinsi'
                                            id='provinsi'
                                            {...createHospital('provinsi')}
                                            onChange={(e) => handlerProvinsi(e.target.value)}
                                        >
                                            {
                                                provinsi.map(data => (
                                                    <option value={data.id} key={data.id}>{data.name}</option>
                                                ))
                                            }
                                        </Select>
                                        {errors.provinsi && <FormErrorMessage>{errors.provinsi.message}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={errors.kabupaten_kota}>
                                        <FormLabel>Kabupaten / Kota</FormLabel>
                                        <Select
                                            placeholder='Kabupaten/Kota'
                                            id='kabupaten_kota'
                                            {...createHospital('kabupaten_kota')}
                                            onChange={(e) => handlerKota(e.target.value)}
                                        >
                                            {
                                                kota.map(data => (
                                                    <option value={data.id} key={data.id}>{data.name}</option>
                                                ))
                                            }
                                        </Select>
                                        {errors.kabupaten_kota && <FormErrorMessage>{errors.kabupaten_kota.message}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={errors.kecamatan}>
                                        <FormLabel>Kecamatan</FormLabel>
                                        <Select
                                            placeholder='Kecamatan'
                                            id='kecamatan'
                                            {...createHospital('kecamatan')}
                                        >
                                            {
                                                kecamatan.map(data => (
                                                    <option value={data.nama} key={data.id}>{data.name}</option>
                                                ))
                                            }
                                        </Select>
                                        {errors.kecamatan && <FormErrorMessage>{errors.kecamatan.message}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={errors.kode_pos}>
                                        <FormLabel>Kode Pos</FormLabel>
                                        <Input placeholder='Kode Pos' id="kodepos" type='number' {...createHospital('kode_pos')} />
                                        {errors.kode_pos && <FormErrorMessage>{errors.kode_pos.message}</FormErrorMessage>}
                                    </FormControl>
                                </Grid>

                                <FormControl mt={'4'} isInvalid={errors.no_telepon}>
                                    <FormLabel>No Telpon</FormLabel>
                                    <Input placeholder='Masukan Nomor Telpon Rumah Sakit' id="no_telpon" type='text' {...createHospital('no_telepon')} />
                                    {errors.no_telepon && <FormErrorMessage>{errors.no_telepon.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.email}>
                                    <FormLabel>email</FormLabel>
                                    <Input placeholder='Masukan Email Rumah Sakit' id="email" type='email' {...createHospital('email')} />
                                    {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.kelas_rs}>
                                    <FormLabel>Kelas Rumah Sakit</FormLabel>
                                    <Select placeholder='Pilih Kelas Rumah Sakit' id='kelas_rs' {...createHospital('kelas_rs')}>
                                        <option>Rumah Sakit Umum Kelas A</option>
                                        <option>Rumah Sakit Umum Kelas B</option>
                                        <option>Rumah Sakit Umum Kelas C</option>
                                        <option>Rumah Sakit Umum Kelas D</option>
                                        <option>Rumah Sakit Khusus</option>
                                    </Select>
                                    {errors.kelas_rs && <FormErrorMessage>{errors.kelas_rs.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.pemilik_pengelola}>
                                    <FormLabel>Pemilik/Pengelola Rumah Sakit</FormLabel>
                                    <Select placeholder='Pilih Pengelola Rumah Sakit' id='pemilik_pengelola' {...createHospital('pemilik_pengelola')}>
                                        <option>Pemerintah</option>
                                        <option>Swasta</option>
                                    </Select>
                                    {errors.pemilik_pengelola && <FormErrorMessage>{errors.pemilik_pengelola.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.jumlah_tempat_tidur}>
                                    <FormLabel>Jumlah Tempat Tidur Tersedia</FormLabel>
                                    <Input placeholder='Masukan Jumlah Tempat Tidur Rumah Sakit' id="jumlah_tempat_tidur" type='number' {...createHospital('jumlah_tempat_tidur')} />
                                    {errors.jumlah_tempat_tidur && <FormErrorMessage>{errors.jumlah_tempat_tidur.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.status_penggunaan}>
                                    <FormLabel>Status Penggunaan</FormLabel>
                                    <Input placeholder='Status Penggunaan Rumah Sakit' id="status_penggunaan" type='text' {...createHospital('status_penggunaan')} />
                                    {errors.status_penggunaan && <FormErrorMessage>{errors.status_penggunaan.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.biaya_registrasi}>
                                    <FormLabel>Biaya Pendaftaran</FormLabel>
                                    <Input placeholder='Masukan Biaya Pendaftaran Rumah Sakit' id="biaya_registrasi" type='number' {...createHospital('biaya_registrasi')} />
                                    {errors.biaya_registrasi && <FormErrorMessage>{errors.biaya_registrasi.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errors.foto}>
                                    {imagePrev && <Image src={imagePrev} maxWidth={'300px'} />}
                                    <FormLabel>Upload Foto Rumah Sakit</FormLabel>
                                    <Input id="foto" type='file'{...createHospital('foto')} onChange={(e) => handleHospitalImage(e)} />
                                    {errors.foto && <FormErrorMessage>{errors.foto.message}</FormErrorMessage>}
                                </FormControl>
                            </>
                        }
                    />

                    <PopupAdmin
                        modalTitle={'Edit Info Rumah Sakit'}
                        isOpen={isModalEditOpen}
                        onClose={onCloseHandler}
                        submitButton={handleUpdate(onUpdateHandler)}
                        modalBody={
                            <>
                                <FormControl isInvalid={errorsUpdate.kode_rs}>
                                    <FormLabel>Kode Rumah Sakit</FormLabel>
                                    <Input placeholder={currentHospital.kode_rs} id="kode_rs" type='text' {...updateHospital('kode_rs')} />
                                    {errorsUpdate.kode_rs && <FormErrorMessage>{errorsUpdate.kode_rs.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.nama}>
                                    <FormLabel>Nama Rumah Sakit</FormLabel>
                                    <Input placeholder={currentHospital.nama} id="nama" type='text' {...updateHospital('nama')} />
                                    {errorsUpdate.nama && <FormErrorMessage>{errorsUpdate.nama.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.alamat}>
                                    <FormLabel>Alamat Rumah Sakit</FormLabel>
                                    <Input placeholder={currentHospital.alamat} id="alamat" type='text' {...updateHospital('alamat')} />
                                    {errorsUpdate.alamat && <FormErrorMessage>{errorsUpdate.alamat.message}</FormErrorMessage>}
                                </FormControl>

                                <Grid
                                    templateColumns={'repeat(2, 1fr)'}
                                    gap={'6'}
                                    mt={'4'}
                                >
                                    <FormControl isInvalid={errorsUpdate.provinsi}>
                                        <FormLabel>Provinsi</FormLabel>
                                        <Select placeholder={currentHospital.provinsi} id='provinsi' {...updateHospital('provinsi')}>
                                            <option>Jawa Timur</option>
                                            <option>rawat jalan</option>
                                            <option>verifikasi</option>
                                            <option>pendaftaran</option>
                                            <option>selesai</option>
                                        </Select>
                                        {errorsUpdate.provinsi && <FormErrorMessage>{errorsUpdate.provinsi.message}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={errorsUpdate.kabupaten_kota}>
                                        <FormLabel>Kabupaten / Kota</FormLabel>
                                        <Select placeholder={currentHospital.kabupaten_kota} id='kabupaten_kota' {...updateHospital('kabupaten_kota')}>
                                            <option>Surabaya</option>
                                            <option>rawat jalan</option>
                                            <option>verifikasi</option>
                                            <option>pendaftaran</option>
                                            <option>selesai</option>
                                        </Select>
                                        {errorsUpdate.kabupaten_kota && <FormErrorMessage>{errorsUpdate.kabupaten_kota.message}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={errorsUpdate.kecamatan}>
                                        <FormLabel>Kecamatan</FormLabel>
                                        <Select placeholder={currentHospital.kecamatan} id='kecamatan' {...updateHospital('kecamatan')} >
                                            <option>Rungkut</option>
                                            <option>rawat jalan</option>
                                            <option>verifikasi</option>
                                            <option>pendaftaran</option>
                                            <option>selesai</option>
                                        </Select>
                                        {errorsUpdate.kecamatan && <FormErrorMessage>{errorsUpdate.kecamatan.message}</FormErrorMessage>}
                                    </FormControl>

                                    <FormControl isInvalid={errorsUpdate.kode_pos}>
                                        <FormLabel>Kode Pos</FormLabel>
                                        <Input placeholder={currentHospital.kode_pos} id="kodepos" type='number' {...updateHospital('kode_pos')} />
                                        {errorsUpdate.kode_pos && <FormErrorMessage>{errorsUpdate.kode_pos.message}</FormErrorMessage>}
                                    </FormControl>
                                </Grid>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.no_telepon}>
                                    <FormLabel>No Telpon</FormLabel>
                                    <Input placeholder={currentHospital.no_telpon} id="no_telpon" type='text' {...updateHospital('no_telepon')} />
                                    {errorsUpdate.no_telepon && <FormErrorMessage>{errorsUpdate.no_telepon.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.email}>
                                    <FormLabel>email</FormLabel>
                                    <Input placeholder={currentHospital.email} id="email" type='email' {...updateHospital('email')} />
                                    {errorsUpdate.email && <FormErrorMessage>{errorsUpdate.email.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.kelas_rs}>
                                    <FormLabel>Kelas Rumah Sakit</FormLabel>
                                    <Select placeholder={currentHospital.kelas_rs} id='kelas_rs' {...updateHospital('kelas_rs')}>
                                        <option>Rumah Sakit Umum Kelas A</option>
                                        <option>Rumah Sakit Umum Kelas B</option>
                                        <option>Rumah Sakit Umum Kelas C</option>
                                        <option>Rumah Sakit Umum Kelas D</option>
                                        <option>Rumah Sakit Khusus</option>
                                    </Select>
                                    {errorsUpdate.kelas_rs && <FormErrorMessage>{errorsUpdate.kelas_rs.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.pemilik_pengelola}>
                                    <FormLabel>Pemilik/Pengelola Rumah Sakit</FormLabel>
                                    <Select placeholder={currentHospital.pemilik_pengelola} id='pemilik_pengelola' {...updateHospital('pemilik_pengelola')}>
                                        <option>Pemerintah</option>
                                        <option>Swasta</option>
                                    </Select>
                                    {errorsUpdate.pemilik_pengelola && <FormErrorMessage>{errorsUpdate.pemilik_pengelola.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.jumlah_tempat_tidur}>
                                    <FormLabel>Jumlah Tempat Tidur Tersedia</FormLabel>
                                    <Input placeholder={currentHospital.jumlah_tempat_tidur} id="jumlah_tempat_tidur" type='number'
                                        {...updateHospital('jumlah_tempat_tidur')}
                                    />
                                    {errorsUpdate.jumlah_tempat_tidur && <FormErrorMessage>{errorsUpdate.jumlah_tempat_tidur.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.status_penggunaan}>
                                    <FormLabel>Status Penggunaan</FormLabel>
                                    <Input placeholder={currentHospital.status_penggunaan} id="status_penggunaan" type='text' {...updateHospital('status_penggunaan')} />
                                    {errorsUpdate.status_penggunaan && <FormErrorMessage>{errorsUpdate.status_penggunaan.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.biaya_registrasi}>
                                    <FormLabel>Biaya Pendaftaran</FormLabel>
                                    <Input placeholder={currentHospital.biaya_registrasi} id="biaya_pendaftaran" type='number' {...updateHospital('biaya_registrasi')} />
                                    {errorsUpdate.biaya_registrasi && <FormErrorMessage>{errorsUpdate.biaya_registrasi.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl mt={'4'} isInvalid={errorsUpdate.foto}>
                                    {currentHospital.foto && <Image src={currentHospital.foto} />}
                                    <FormLabel>Upload Foto Rumah Sakit</FormLabel>
                                    <Input id="foto" type='file' {...updateHospital('foto')} onChange={(e) => handleHospitalImage(e)} />
                                    {errorsUpdate.kode_rs && <FormErrorMessage>{errorsUpdate.kode_rs.message}</FormErrorMessage>}
                                </FormControl>
                            </>
                        }
                    />
                    <PopupDelete
                        deletet_name={'Hapus Hospital'}
                        modalBody={'Apakah Anda Yakin Menghapus Data Hospital?'}
                        modalTitle={'Hapus Data Hospital'}
                        isOpen={isModalDeleteOpen}
                        onClose={onCloseModalDelete}
                        onDelete={() => onDeleteHandler(hospitalId)}
                    />
                </LayoutAdminRoot>
            }
        </>
    );
}

export default HospitalRootPages;
