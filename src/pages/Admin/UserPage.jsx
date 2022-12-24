import React, { useRef, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import HeadAdmin from '../../components/HeadAdmin';
import TableAdmin from '../../components/TableAdmin';
import { Tr, Td } from '@chakra-ui/table';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import PopupAdmin from '../../components/PopupAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const UserPage = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure()
    const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure()

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [handphone, setHandphone] = useState();
    const [role, setRole] = useState();


    const initialValues = {
        name: '',
        email: '',
        password: '',
        handphone: '',
        role: '',
    };

    const [initialValue, setInitialValue] = useState(initialValues);

    const schema = Yup.object().shape({
        name: Yup.string().required('Nama wajib diisi'),
        email: Yup.string().required('Email wajib diisi').email('Format email salah'),
        password: Yup.string().required('Password wajib diisi').min(8, 'Password minimal 8 karakter'),
        handphone: Yup.string().required('Nomor hp wajib diisi').min(11, 'Nomor hp belum lengkap').max(13, 'Nomor HP salah, melebihi batas normal'),
        role: Yup.string().required('Wajib Memilih Role')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: initialValue
    })


    const submitButton = (e) => {
        // e.preventDefault();
        console.log("Values::::", e)
    };

    return (
        <LayoutAdmin activeMenu={'user'}>
            <HeadAdmin
                title={'Manajemen Admin'}
                isAdd={onModalCreateOpen}
            />

            <PopupAdmin
                isOpen={isOpenModalEdit}
                onClose={onCloseModalEdit}
                modalTitle={'Ubah Info Admin'}
                modalBody={
                    <>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Nama</FormLabel>
                            <Input placeholder='Full name' id="name" type='text' {...register('name')} />
                            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.email} mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' type={'email'} id='email' {...register('email')} />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}

                        </FormControl>

                        <FormControl isInvalid={errors.handphone} mt={4}>
                            <FormLabel>Handphone</FormLabel>
                            <Input placeholder='Nomor Handphone' type={'text'} id='handphone' {...register('handphone')} />
                            {errors.handphone && <FormErrorMessage>{errors.handphone.message}</FormErrorMessage>}

                        </FormControl>

                        <FormControl isInvalid={errors.role} mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select placeholder='Pilih Role' id='role' {...register('role')}>
                                <option>Admin</option>
                                <option>Super Admin</option>
                            </Select>
                            {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.password} mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' type={'password'} id='password' {...register('password')} />
                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            />

            <PopupAdmin
                isOpen={isModalCreateOpen}
                onClose={onCloseModalCreate}
                modalTitle={'Tambah Admin'}
                submitButton={handleSubmit(submitButton)}
                modalBody={
                    <>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Nama</FormLabel>
                            <Input placeholder='Full name' id="name" type='text' {...register('name')} />
                            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.email} mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' type={'email'} id='email' {...register('email')} />
                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}

                        </FormControl>

                        <FormControl isInvalid={errors.handphone} mt={4}>
                            <FormLabel>Handphone</FormLabel>
                            <Input placeholder='Nomor Handphone' type={'text'} id='handphone' {...register('handphone')} />
                            {errors.handphone && <FormErrorMessage>{errors.handphone.message}</FormErrorMessage>}

                        </FormControl>

                        <FormControl isInvalid={errors.role} mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select placeholder='Pilih Role' id='role' {...register('role')}>
                                <option>Admin</option>
                                <option>Super Admin</option>
                            </Select>
                            {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.password} mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' type={'password'} id='password' {...register('password')} />
                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            />
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
                            fontSize={'18px'}
                            textAlign='center'
                        >
                            Nama
                        </Td>
                        <Td
                            fontWeight={'400'}
                            fontSize={'18px'}
                            textAlign='center'
                        >
                            Email
                        </Td>
                        <Td
                            fontWeight={'400'}
                            fontSize={'18px'}
                            textAlign='center'
                        >
                            Handphone
                        </Td>
                        <Td
                            fontWeight={'400'}
                            fontSize={'18px'}
                            textAlign='center'
                        >
                            Role
                        </Td>
                        <Td
                            fontWeight={'400'}
                            fontSize={'18px'}
                            textAlign='center'
                        >
                            Actions
                        </Td>
                    </Tr>
                }
                bodyTable={
                    testTable.map(data => (
                        <Tr key={data.no}>
                            <Td
                                textAlign='center'
                            >
                                {data.no}
                            </Td>
                            <Td>
                                {data.name}
                            </Td>
                            <Td>{data.email}</Td>
                            <Td>{data.handphone}</Td>
                            <Td>{data.role}</Td>
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
        </LayoutAdmin>
    );
}

const testTable = [
    {
        no: '1',
        name: 'Almira Mahsa',
        email: 'almiramahsa9@gmail.com',
        handphone: '085646087878',
        role: 'super admin'
    },
    {
        no: '2',
        name: 'Mitro Ubaid',
        email: 'Mitroubaid@gmail.com',
        handphone: '085646087878',
        role: 'super admin'
    },
]


export default UserPage;
