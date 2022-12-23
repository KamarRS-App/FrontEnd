import React from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import HeadAdmin from '../../components/HeadAdmin';
import TableAdmin from '../../components/TableAdmin';
import { Tr, Td } from '@chakra-ui/table';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';

const UserPage = () => {
    return (
        <LayoutAdmin>
            <HeadAdmin title={'Manajemen Admin'} />
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
                        <Tr>
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
