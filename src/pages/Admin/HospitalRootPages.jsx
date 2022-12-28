import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import HeadAdmin from '../../components/HeadAdmin';
import LayoutAdminRoot from '../../components/LayoutAdminRoot';
import TableAdmin from '../../components/TableAdmin';

const HospitalRootPages = () => {
    return (
        <LayoutAdminRoot activeMenu={'hospital'}>
            <HeadAdmin title={'Akun Rumah Sakit'} />
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
                    <>
                    </>
                }
            />
        </LayoutAdminRoot>
    );
}

const DataRs = [
    {
        
    }
]

export default HospitalRootPages;
