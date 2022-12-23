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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [errors, setErrors] = useState({});

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [handphone, setHandphone] = useState();
    const [role, setRole] = useState();
    const [submitted, setSubmitted] = useState([]);
    const formRef = useRef();

    let schema = Yup.object().shape({
        name: Yup.string().required('Nama wajib diisi'),
        email: Yup.string().email('Format email salah').required('Email wajib diisi'),
        password: Yup.string().min(8, 'Password minimal 8 karakter').required('Password wajib diisi'),
        handphone: Yup.string().min(11, 'Nomor hp belum lengkap').required('Nomor hp wajib diisi'),
        role: Yup.string().required('Wajib Memilih Role')
    });

    // const InsertAdminInputs = {
    //     name: string,
    //     email: string,
    //     password: string,
    //     role: string,
    //     handphone: string,
    // }


    const submitButton = (e) => {
        e.preventDefault();
        const formInputs = [...formRef.current.elements];
        const newSubmitted = formInputs.reduce(
            (acc, input) => {
                return {
                    acc,
                    [input.name]: input.value
                };
            }
        );
        setSubmitted((prevSubmitted) => [...prevSubmitted, newSubmitted]);

        // setName(nameRef.current.e);
        // setEmail(emailRef.current.e);
        // setPassword(passwordRef.current.e);
        // setHandphone(handphoneRef.current.e);
        // setRole(roleRef.current.value);
        console.log(submitted)
        // try {
        //     schema.validateSync(
        //         {
        //             
        //         },
        //         {
        //             abortEarly: false
        //         }
        //     )
        //     onClose();
        // }
        // catch (err) {
        //     const { inner } = err;
        //     let formErrors = {};

        //     if (inner && inner[0]) {
        //         inner.forEach(error => {
        //             const { path, message } = error;

        //             if (!formErrors[path]) {
        //                 formErrors[path] = message;
        //             }
        //         });
        //     }
        //     setErrors(formErrors);
        // }
    };
    return (
        <LayoutAdmin activeMenu={'user'}>
            <HeadAdmin
                title={'Manajemen Admin'}
                isAdd={onOpen}
            />
            <PopupAdmin
                isOpen={isOpen}
                onClose={onClose}
                titleModal={'Buat Akun Untuk Admin'}
                formRef={formRef}
                modalBody={
                    <>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Nama</FormLabel>
                            <Input placeholder='Full name' id="name-input" name='name' type={'text'} />
                            {errors.name && <FormErrorMessage>Email is required.</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.email} mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' type={'email'} />
                            {errors.email && <FormErrorMessage>Email is required.</FormErrorMessage>}

                        </FormControl>

                        <FormControl isInvalid={errors.handphone} mt={4}>
                            <FormLabel>Handphone</FormLabel>
                            <Input placeholder='Nomor Handphone' type={'text'} />
                            {errors.handphone && <FormErrorMessage>Email is required.</FormErrorMessage>}

                        </FormControl>

                        <FormControl isInvalid={errors.role} mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select placeholder='Pilih Role'>
                                <option>Admin</option>
                                <option>Super Admin</option>
                            </Select>
                            {errors.role && <FormErrorMessage>Email is required.</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.password} mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' type={'password'} />
                            {errors.password && <FormErrorMessage>Email is required.</FormErrorMessage>}
                        </FormControl>
                    </>
                }
                submitButton={(e) => submitButton(e)}
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
