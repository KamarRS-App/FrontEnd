import { Button, ButtonGroup } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Td, Tr } from '@chakra-ui/table';
import { useToast } from '@chakra-ui/toast';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import HeadAdminPoli from '../../components/HeadAdminPoli';
import LayoutAdmin from '../../components/LayoutAdmin';
import TableAdmin from '../../components/TableAdmin';
import api from '../../services/api';
import PopupAdmin from '../../components/PopupAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import PopupDelete from '../../components/PopupDelete';
import axios from 'axios';
import { Image } from '@chakra-ui/react';

const PoliclinicPages = () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    const toast = useToast();
    const navigate = useNavigate();
    const [policlinics, setPoliclinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [policlinicId, setPoliclinicId] = useState();
    const [jamPraktik, setJamPraktik] = useState();
    const [policlinicName, setPoliclinicName] = useState('');
    const [doctorImage, setDoctorImage] = useState('');
    const [doctorId, setDoctorId] = useState();

    //policlinic
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
    const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
    //doctor
    const { isOpen: isOpenAddModalDoctor, onOpen: onOpenAddModalDoctor, onClose: onCloseAddModalDoctor } = useDisclosure();
    const { isOpen: isOpenEditModalDoctor, onOpen: onOpenEditModalDoctor, onClose: onCloseEditModalDoctor } = useDisclosure();
    const { isOpen: isOpenDeleteModalDoctor, onOpen: onOpenDeleteModalDoctor, onClose: onCloseDeleteModalDoctor } = useDisclosure();

    const staff = useSelector((state) => state.staffs);

    //consume api
    //policlinic
    const getPoliclinicByHospital = async () => {
        await api.getAllPoliclinics(token)
            .then(response => {
                const data = response.data.data
                setPoliclinics(data);
                searchIdDefault(data)
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal memuat data poliklinik',
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    const getDoctorsByPoliclinic = async () => {
        await api.getAllDoctors(token)
            .then(response => {
                const data = response.data.data
                setDoctors(data);
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal memuat data dokter',
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    const createPoliclinicHandler = async (data) => {
        await api.createPoliclinic(token, data)
            .then(response => {
                const data = response.data;
                toast({
                    position: 'top',
                    title: 'Poliklinik baru berhasil ditambahakan',
                    status: 'success',
                    duration: '2000',
                    isClosable: true
                })
                getPoliclinicByHospital();
                getDoctorsByPoliclinic();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Poliklinik baru gagal ditambahakan',
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    const updatePoliclinicHandler = async (data) => {
        await api.updatePoliclinic(token, policlinicId, data)
            .then(response => {
                toast({
                    position: 'top',
                    title: `${policlinicName} berhasil diupdate`,
                    status: 'success',
                    duration: '2000',
                    isClosable: true
                })
                getDoctorsByPoliclinic();
                getPoliclinicByHospital();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: `${policlinicName} gagal diupdate`,
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    const getPoliclinicById = async () => {
        await api.getPoliclinicById(token, policlinicId)
            .then(response => {
                const data = response.data.data
                setValueEdit('nama_poli', data.nama_poli)
                setValueEdit('jam_praktik', data.jam_praktik)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deletePoliclinicHandler = async () => {
        await api.DeletePoliclinic(token, policlinicId)
            .then(response => {
                toast({
                    position: 'top',
                    title: `${policlinicName} berhasil dihapus`,
                    status: 'success',
                    duration: '2000',
                    isClosable: true
                })
                getDoctorsByPoliclinic();
                getPoliclinicByHospital();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: `${policlinicName} gagal dihapus`,
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    //doctor
    const createDoctorHandler = async (data) => {
        await axios.post(`http://34.143.247.242/doctors`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                const data = response.data
                toast({
                    position: 'top',
                    title: 'Berhasil menambahkan data dokter',
                    status: 'success',
                    duration: '2000',
                    isClosable: true
                })
                getDoctorsByPoliclinic();
            })
            .catch(error => {
                // console.log(error)
                toast({
                    position: 'top',
                    title: 'Gagal menambahkan data dokter',
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    const updateDoctorHandler = async (id, data) => {
        await axios.put(`http://34.143.247.242/doctors/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                const data = response.data
                toast({
                    position: 'top',
                    title: 'Berhasil mengubah data dokter',
                    status: 'success',
                    duration: '2000',
                    isClosable: true
                })
                getDoctorsByPoliclinic();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal mengubah data dokter',
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
                getDoctorsByPoliclinic();
            })
    }

    const getDoctorByIdHandler = async (id) => {
        await api.getDoctorById(token, id)
            .then(response => {
                const data = response.data.data;
                setValueUpdateDoctor('nama', data.nama);
                setValueUpdateDoctor('email', data.email);
                setValueUpdateDoctor('foto', data.foto);
                setValueUpdateDoctor('policlinic_id', data.policlinic_id);
                setValueUpdateDoctor('spesialis', policlinicName);
                setValueUpdateDoctor('no_telpon', data.no_telpon);
                setDoctorImage(data.foto);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteDoctorHandler = async (id) => {
        await api.deleteDoctor(token, id)
            .then(response => {
                toast({
                    position: 'top',
                    title: 'Berhasil menghapus data dokter',
                    status: 'success',
                    duration: '2000',
                    isClosable: true
                })
                getDoctorsByPoliclinic();
            })
            .catch(error => {
                toast({
                    position: 'top',
                    title: 'Gagal menghapus data dokter',
                    status: 'error',
                    duration: '2000',
                    isClosable: true
                })
            })
    }

    //yup validation
    //policlinic

    const initialValues = {
        nama_poli: '',
        jam_praktik: '',
        hospital_id: staff.hospital_id
    }

    const [initialValue, setInitialValue] = useState(initialValues);

    const schema = Yup.object().shape({
        nama_poli: Yup.string().required('Nama Poliklinik tidak boleh kosong'),
        jam_praktik: Yup.string().required('Jam Praktik tidak boleh kosong'),
        hospital_id: Yup.number().required('Id Rumah Sakit tidak ditemukan'),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: initialValue
    })

    const { register: updatePoliclinic, handleSubmit: submitUpdatePoliclinic, formState: { errors: errorsEdit }, setValue: setValueEdit } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: initialValue
    })

    //doctor

    const initialValueDoctors = {
        nama: '',
        spesialis: '',
        email: '',
        no_telpon: '',
        foto: '',
        policlinic_id: null
    }

    const [initialValueDoctor, setInitialValueDoctor] = useState(initialValueDoctors)

    const schemaDoctor = Yup.object().shape({
        nama: Yup.string().required("Harap masukkan nama"),
        spesialis: Yup.string().required("Harap masukkan bidang"),
        email: Yup.string().required("Harap masukkan email").email("Format email salah"),
        no_telpon: Yup.string().min(11, "Harap masukkan nomor telpon dengan benar").max(13, 'Harap masukkan nomor telpon dengan benar').required('Harap masukkan nomor telpon'),
        foto: Yup.string().required('Foto tidak boleh kosong'),
        policlinic_id: Yup.number().required('Poliklinik wajib diisi'),
    });

    const { register: registerDoctor, handleSubmit: handleSubmitDoctor, formState: { errors: errorsDoctor }, setValue: setValueDoctor } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schemaDoctor),
        defaultValues: initialValueDoctor
    })

    const { register: updateDoctor, handleSubmit: handleUpdateDoctor, formState: { errors: errorsUpdateDoctor }, setValue: setValueUpdateDoctor } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schemaDoctor),
        defaultValues: initialValueDoctor
    })

    const onOpenAddDoctor = () => {
        setValueDoctor('policlinic_id', policlinicId);
        setValueDoctor('spesialis', policlinicName);
        onOpenAddModalDoctor();
    }

    const handleDoctorImage = (e) => {
        const file = e.target.files[0];
        setDoctorImage(file)
    }

    const onSubmitDoctor = (e) => {
        const data = new FormData();
        data.append('nama', e.nama)
        data.append('spesialis', e.spesialis)
        data.append('email', e.email)
        data.append('no_telpon', e.no_telpon)
        data.append('foto', doctorImage)
        data.append('policlinic_id', e.policlinic_id)
        console.log(data.get('nama'))
        createDoctorHandler(data);
    }

    const handleEditeDoctor = (id) => {
        onOpenEditModalDoctor()
        getDoctorByIdHandler(id);
        setDoctorId(id);
    }

    const onClickedUpdateDoctor = (values) => {
        const data = new FormData();
        data.append('nama', values.nama);
        data.append('email', values.email);
        data.append('foto', doctorImage);
        data.append('no_telpon', values.no_telpon);
        data.append('policlinic_id', values.policlinic_id);

        updateDoctorHandler(doctorId, data);
        onCloseEditModalDoctor();
    }

    const handleDeleteDoctor = (id) => {
        setDoctorId(id);
        onOpenDeleteModalDoctor();
    }

    const onDeleteDoctorClicked = () => {
        deleteDoctorHandler(doctorId);
        onCloseDeleteModalDoctor();
    }

    //policlinic

    const submitButtonPoliclinic = (values) => {
        createPoliclinicHandler(values);
        onCloseModalCreate();
        setValue('jam_praktik', '')
        setValue('nama_poli', '')
    };

    const onChangePoliclinic = (values) => {
        setPoliclinicId(values)
        policlinics.map(data => {
            if (data.id == values) {
                setJamPraktik(data.jam_praktik);
                setPoliclinicName(data.nama_poli);
            }
        })
    }

    const onDeleteClicked = () => {
        deletePoliclinicHandler()
        onCloseModalDelete();
    }

    const searchIdDefault = (item) => {
        item.map((data, index) => {
            if (index === 0) {
                setPoliclinicId(data.id);
                setJamPraktik(data.jam_praktik);
                setPoliclinicName(data.nama_poli);
                setValueDoctor('policlinic_id', data.id)
            }
        })
    }

    const onEditHandler = () => {
        getPoliclinicById();
        onOpenModalEdit();
    }

    const onUpdateClicked = (values) => {
        updatePoliclinicHandler(values);
        onCloseModalEdit();
    }

    const newDoctors = doctors.filter((data) => {
        return data.policlinic_id == policlinicId
    });

    useEffect(() => {
        if (role !== 'Admin - Staff' && token === undefined) {
            toast({
                position: 'top',
                title: 'Kamu Harus Login Dulu',
                status: 'warning',
                duration: '2000',
                isClosable: true
            })
            navigate('/admin/login');
        }
        getPoliclinicByHospital();
        getDoctorsByPoliclinic();
    }, []);

    return (
        <LayoutAdmin activeMenu={'poli'}>
            <HeadAdminPoli
                title={`Manajemen ${policlinicName}`}
                onAdd={onModalCreateOpen}
                nama_poli={'Pilih Poliklinik'}
                onDelete={onOpenModalDelete}
                onEdit={onEditHandler}
                select_poli={
                    <Select
                        width={'200px'}
                        id={'policlinic_id'}
                        value={policlinicId}
                        onChange={(e) => onChangePoliclinic(e.target.value)}
                    >
                        {
                            policlinics.map((data, index) => {
                                return (
                                    <option value={data.id} key={index}>{data.nama_poli}</option>
                                )
                            })
                        }
                    </Select>
                }
            />

            <Box
                mt={'5'}
                p={{ base: '2', sm: '5', md: '10' }}
                bg="white"
            >
                {
                    newDoctors.length !== 0 &&
                    <Box
                        width={'full'}
                        textAlign={'end'}
                    >
                        <Button
                            onClick={onOpenAddDoctor}
                            bg="#3AB8FF"
                            color={'white'}
                            fontSize={'14px'}
                            fontWeight={'700'}
                            height={'50px'}
                            _hover={{ bg: 'alta.primary' }}
                        >
                            Tambah Data Dokter
                        </Button>
                    </Box>
                }
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
                    bodyTable={
                        newDoctors.length === 0 ?
                            <Tr>
                                <Td
                                    colSpan={'6'}
                                    textAlign={'center'}
                                >
                                    <Text
                                        fontWeight={'500'}
                                        color={'#ADB8CC'}
                                        mb={'5'}
                                    >
                                        Data Belum Ada
                                    </Text>
                                    <Button
                                        onClick={onOpenAddDoctor}
                                        bg="#3AB8FF"
                                        color={'white'}
                                        fontSize={'14px'}
                                        fontWeight={'700'}
                                        height={'50px'}
                                        _hover={{ bg: 'alta.primary' }}
                                    >
                                        Tambah Data Dokter
                                    </Button>
                                </Td>
                            </Tr>
                            :
                            newDoctors.map((doctor, index) => (
                                <Tr key={index}>
                                    <Td textAlign={'center'}>{index + 1}</Td>
                                    <Td textAlign={'center'}>{doctor.nama}</Td>
                                    <Td textAlign={'center'}>{doctor.spesialis}</Td>
                                    <Td textAlign={'center'}>{doctor.email}</Td>
                                    <Td textAlign={'center'}>{doctor.no_telpon}</Td>
                                    <Td textAlign={'center'}>{jamPraktik}</Td>
                                    <Td textAlign="center">
                                        <ButtonGroup gap="4">
                                            <Button
                                                onClick={() => handleEditeDoctor(doctor.id)}
                                                bg="transparent"
                                                border="1px"
                                                borderColor={'#E0E0E0'}
                                            >
                                                <MdModeEdit />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteDoctor(doctor.id)}
                                                bg="transparent"
                                                border="1px"
                                                borderColor={'#E0E0E0'}
                                            >
                                                <MdOutlineDeleteOutline />
                                            </Button>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                />
            </Box>

            {/* pop up policlinic */}
            <PopupAdmin
                isOpen={isModalCreateOpen}
                onClose={onCloseModalCreate}
                modalTitle={'Tambahkan Poliklinik Baru'}
                submitButton={handleSubmit(submitButtonPoliclinic)}
                modalBody={
                    <>
                        <FormControl isInvalid={errors.nama_poli}>
                            <FormLabel>Nama Poliklinik</FormLabel>
                            <Input placeholder='Masukan Nama Poliklinik' id="nama_poli" type='text' {...register('nama_poli')} />
                            {errors.nama_poli && <FormErrorMessage>{errors.nama_poli.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={'4'} isInvalid={errors.jam_praktik}>
                            <FormLabel>Jam Praktik</FormLabel>
                            <Input placeholder='Masukan Jam Praktik Poliklinik' id="jam_praktik" type='text' {...register('jam_praktik')} />
                            {errors.jam_praktik && <FormErrorMessage>{errors.jam_praktik.message}</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            />

            <PopupAdmin
                isOpen={isOpenModalEdit}
                onClose={onCloseModalEdit}
                modalTitle={`Edit ${policlinicName}`}
                submitButton={submitUpdatePoliclinic(onUpdateClicked)}
                modalBody={
                    <>
                        <FormControl isInvalid={errorsEdit.nama_poli}>
                            <FormLabel>Nama Poliklinik</FormLabel>
                            <Input placeholder='Masukan Nama Poliklinik' id="nama_poli" type='text' {...updatePoliclinic('nama_poli')} />
                            {errorsEdit.nama_poli && <FormErrorMessage>{errorsEdit.nama_poli.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={'4'} isInvalid={errorsEdit.jam_praktik}>
                            <FormLabel>Jam Praktik</FormLabel>
                            <Input placeholder='Masukan Jam Praktik Poliklinik' id="jam_praktik" type='text' {...updatePoliclinic('jam_praktik')} />
                            {errorsEdit.jam_praktik && <FormErrorMessage>{errorsEdit.jam_praktik.message}</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            />

            <PopupDelete
                deletet_name={'Hapus Poliklinik'}
                modalBody={'Apakah kamu yakin menghapus Poliklinik?'}
                modalTitle={'Hapus Poliklinik'}
                isOpen={isOpenModalDelete}
                onClose={onCloseModalDelete}
                onDelete={() => onDeleteClicked()}
            />

            {/* pop up doctor */}

            <PopupAdmin
                modalTitle={"Tambah Data Dokter"}
                isOpen={isOpenAddModalDoctor}
                onClose={onCloseAddModalDoctor}
                submitButton={handleSubmitDoctor(onSubmitDoctor)}
                modalBody={
                    <>
                        <FormControl isInvalid={errorsDoctor.nama}>
                            <FormLabel>Nama</FormLabel>
                            <Input
                                {...registerDoctor("nama")}
                                placeholder="Nama Dokter"
                                id="name"
                                type="text"
                                name="nama"
                            />
                            {errorsDoctor.nama && (
                                <FormErrorMessage>{errorsDoctor.nama.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsDoctor.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                {...registerDoctor("email")}
                                name="email"
                                placeholder="Email Dokter"
                                type={"email"}
                                id="email"
                            />
                            {errorsDoctor.email && (
                                <FormErrorMessage>{errorsDoctor.email.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsDoctor.no_telpon}>
                            <FormLabel>No Telpon</FormLabel>
                            <Input
                                {...registerDoctor("no_telpon")}
                                name="no_telpon"
                                placeholder="Nomor Telephone Dokter"
                                type={"number"}
                                id="no_telpon"
                            />
                            {errorsDoctor.no_telpon && (
                                <FormErrorMessage>{errorsDoctor.no_telpon.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={'4'} isInvalid={errorsDoctor.foto}>
                            <FormLabel>Upload Foto Dokter</FormLabel>
                            <Input id="foto" type='file'{...registerDoctor('foto')} onChange={(e) => handleDoctorImage(e)} />
                            {errorsDoctor.foto && <FormErrorMessage>{errorsDoctor.foto.message}</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            />

            <PopupAdmin
                modalTitle={"Ubah Data Dokter"}
                isOpen={isOpenEditModalDoctor}
                onClose={onCloseEditModalDoctor}
                submitButton={handleUpdateDoctor(onClickedUpdateDoctor)}
                modalBody={
                    <>
                        <FormControl isInvalid={errorsUpdateDoctor.nama}>
                            <FormLabel>Nama</FormLabel>
                            <Input
                                {...updateDoctor("nama")}
                                placeholder="Nama Dokter"
                                id="name"
                                type="text"
                                name="nama"
                            />
                            {errorsUpdateDoctor.nama && (
                                <FormErrorMessage>{errorsUpdateDoctor.nama.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsUpdateDoctor.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                {...updateDoctor("email")}
                                name="email"
                                placeholder="Email Dokter"
                                type={"email"}
                                id="email"
                            />
                            {errorsUpdateDoctor.email && (
                                <FormErrorMessage>{errorsUpdateDoctor.email.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={4} isInvalid={errorsUpdateDoctor.no_telpon}>
                            <FormLabel>No Telpon</FormLabel>
                            <Input
                                {...updateDoctor("no_telpon")}
                                name="no_telpon"
                                placeholder="Nomor Telephone Dokter"
                                type={"number"}
                                id="no_telpon"
                            />
                            {errorsUpdateDoctor.no_telpon && (
                                <FormErrorMessage>{errorsUpdateDoctor.no_telpon.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={'4'} isInvalid={errorsUpdateDoctor.foto}>
                            {doctorImage && <Image src={doctorImage} width='auto' height={'300px'} />}
                            <FormLabel>Upload Foto Dokter</FormLabel>
                            <Input id="foto" type='file'{...updateDoctor('foto')} onChange={(e) => handleDoctorImage(e)} />
                            {errorsUpdateDoctor.foto && <FormErrorMessage>{errorsUpdateDoctor.foto.message}</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            />

            <PopupDelete
                deletet_name={'Hapus Dokter'}
                modalBody={'Apakah kamu yakin menghapus Dokter ini?'}
                modalTitle={'Hapus Dokter'}
                isOpen={isOpenDeleteModalDoctor}
                onClose={onCloseDeleteModalDoctor}
                onDelete={() => onDeleteDoctorClicked()}
            />

        </LayoutAdmin>
    );
}

export default PoliclinicPages;
