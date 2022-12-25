import React from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import HeadAdmin from '../../components/HeadAdmin';
import TableAdmin from '../../components/TableAdmin';
import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Select, Td, Tr, useDisclosure, useNumberInput } from '@chakra-ui/react';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import PopupAdmin from '../../components/PopupAdmin';
import PopupDelete from '../../components/PopupDelete';

const RoomPage = () => {
    const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();
    const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();

    const { getInputProps: inputBed, getIncrementButtonProps: incBed, getDecrementButtonProps: decBed } =
        useNumberInput({
            step: 1,
            defaultValue: 10,
            min: 1,
            max: 100,
            precision: 0,
        });

    const { getInputProps: inputBedAvailable, getIncrementButtonProps: incBedAvailable, getDecrementButtonProps: decBedAvailable } =
        useNumberInput({
            step: 1,
            defaultValue: 10,
            min: 1,
            max: 100,
            precision: 0,
        });


    const { getInputProps: inputBedAvailableInfo, getIncrementButtonProps: incBedAvailableInfo, getDecrementButtonProps: decBedAvailableInfo } =
        useNumberInput({
            step: 1,
            defaultValue: 10,
            min: 1,
            max: 100,
            precision: 0,
        });

    const { getInputProps: inputBedInfo, getIncrementButtonProps: incBedInfo, getDecrementButtonProps: decBedInfo } =
        useNumberInput({
            step: 1,
            defaultValue: 10,
            min: 1,
            max: 100,
            precision: 0,
        });

    const inc = incBed();
    const dec = decBed();
    const input = inputBed();

    const incAvailable = incBedAvailable();
    const decAvailable = decBedAvailable();
    const inputAvailable = inputBedAvailable();

    const incInfo = incBedInfo();
    const decInfo = decBedInfo();
    const inputInfo = inputBedInfo();

    const incAvailableInfo = incBedAvailableInfo();
    const decAvailableInfo = decBedAvailableInfo();
    const inputAvailableInfo = inputBedAvailableInfo();

    return (
        <LayoutAdmin activeMenu={'room'}>
            <HeadAdmin
                title={'Manajemen Tempat Tidur Pasien'}
                isAdd={onModalCreateOpen}
            />
            <Box
                mt={'5'}
                py={'10'}
                bg='white'
            >
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
                                Ruangan
                            </Td>
                            <Td
                                fontWeight={'400'}
                                fontSize={'18px'}
                                textAlign='center'
                            >
                                Bed Tersedia
                            </Td>
                            <Td
                                fontWeight={'400'}
                                fontSize={'18px'}
                                textAlign='center'
                            >
                                BPJS
                            </Td>
                            <Td
                                fontWeight={'400'}
                                fontSize={'18px'}
                                textAlign='center'
                            >
                                Bed Kosong
                            </Td>
                            <Td
                                fontWeight={'400'}
                                fontSize={'18px'}
                                textAlign='center'
                            >
                                Status
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
                        DataRoom.map(room => (
                            <Tr>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                >
                                    {room.no}
                                </Td>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                >
                                    {room.ruang}
                                </Td>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                >
                                    {room.bed_total}
                                </Td>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                >
                                    {room.BPJS}
                                </Td>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                >
                                    {room.bed_available}
                                </Td>
                                <Td
                                    fontWeight={'400'}
                                    textAlign='center'
                                >
                                    {room.status}
                                </Td>
                                <Td
                                    fontWeight={'400'}
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
                                            onClick={onOpenModalDelete}
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
            </Box>
            <PopupAdmin
                modalTitle={'Tambah Tempat Tidur'}
                isOpen={isModalCreateOpen}
                onClose={onCloseModalCreate}
                modalBody={
                    <>
                        <FormControl>
                            <FormLabel>Ruangan</FormLabel>
                            <Input placeholder='Ruangan' id="ruang" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kelas</FormLabel>
                            <Input placeholder='Kelas Ruangan' type={'text'} id='kelas' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Bed Tersedia</FormLabel>
                            <HStack maxW={'80'} bg='#F5F6F8'>
                                <Button
                                    {...dec}
                                    color='white'
                                    bg={'#E74C3C'}
                                    _hover={{ bg: '#E74C3C' }}
                                >
                                    -
                                </Button>
                                <Input
                                    borderRadius='0'
                                    {...input}
                                    bg='#F5F6F8'
                                    border={'none'}
                                />
                                <Button
                                    {...inc}
                                    bg={'#2F80ED'}
                                    color='white'
                                    _hover={{ bg: '#2F80ED' }}
                                >
                                    +
                                </Button>
                            </HStack>
                            {/* {errors.handphone && <FormErrorMessage>{errors.handphone.message}</FormErrorMessage>} */}

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>BPJS</FormLabel>
                            <Select placeholder='Pilih Layanan BPJS' id='bpjs' >
                                <option>iya</option>
                                <option>tidak</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Bed Kosong</FormLabel>
                            <HStack maxW={'80'} bg='#F5F6F8'>
                                <Button
                                    {...decAvailable}
                                    color='white'
                                    bg={'#E74C3C'}
                                    _hover={{ bg: '#E74C3C' }}
                                >
                                    -
                                </Button>
                                <Input
                                    borderRadius='0'
                                    {...inputAvailable}
                                    bg='#F5F6F8'
                                    border={'none'}
                                />
                                <Button
                                    {...incAvailable}
                                    bg={'#2F80ED'}
                                    color='white'
                                    _hover={{ bg: '#2F80ED' }}
                                >
                                    +
                                </Button>
                            </HStack>
                            {/* {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select placeholder='Pilih Status Kamar Tidur' id='status' >
                                <option>tersedia</option>
                                <option>tidak tersedia</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />

            <PopupAdmin
                modalTitle={'Ubah Info Tempat Tidur'}
                isOpen={isOpenModalEdit}
                onClose={onCloseModalEdit}
                modalBody={
                    <>
                        <FormControl>
                            <FormLabel>Ruangan</FormLabel>
                            <Input placeholder='Ruangan' id="ruang" type='text' />
                            {/* {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Kelas</FormLabel>
                            <Input placeholder='Kelas Ruangan' type={'text'} id='kelas' />
                            {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Bed Tersedia</FormLabel>
                            <HStack maxW={'80'} bg='#F5F6F8'>
                                <Button
                                    {...decInfo}
                                    color='white'
                                    bg={'#E74C3C'}
                                    _hover={{ bg: '#E74C3C' }}
                                >
                                    -
                                </Button>
                                <Input
                                    borderRadius='0'
                                    {...inputInfo}
                                    bg='#F5F6F8'
                                    border={'none'}
                                />
                                <Button
                                    {...incInfo}
                                    bg={'#2F80ED'}
                                    color='white'
                                    _hover={{ bg: '#2F80ED' }}
                                >
                                    +
                                </Button>
                            </HStack>
                            {/* {errors.handphone && <FormErrorMessage>{errors.handphone.message}</FormErrorMessage>} */}

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>BPJS</FormLabel>
                            <Select placeholder='Pilih Layanan BPJS' id='bpjs' >
                                <option>iya</option>
                                <option>tidak</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Bed Kosong</FormLabel>
                            <HStack maxW={'80'} bg='#F5F6F8'>
                                <Button
                                    {...decAvailableInfo}
                                    color='white'
                                    bg={'#E74C3C'}
                                    _hover={{ bg: '#E74C3C' }}
                                >
                                    -
                                </Button>
                                <Input
                                    borderRadius='0'
                                    {...inputAvailableInfo}
                                    bg='#F5F6F8'
                                    border={'none'}
                                />
                                <Button
                                    {...incAvailableInfo}
                                    bg={'#2F80ED'}
                                    color='white'
                                    _hover={{ bg: '#2F80ED' }}
                                >
                                    +
                                </Button>
                            </HStack>
                            {/* {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>} */}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select placeholder='Pilih Status Kamar Tidur' id='status' >
                                <option>tersedia</option>
                                <option>tidak tersedia</option>
                            </Select>
                            {/* {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>} */}
                        </FormControl>
                    </>
                }
            />

            <PopupDelete 
                isOpen={isOpenModalDelete}
                onClose={onCloseModalDelete}
                modalBody={'Apakah anda yakin menghapus ruangan ini?'}
                modalTitle={'Hapus Ruangan'}
                deletet_name={'Hapus Ruangan'}
            />
        </LayoutAdmin>

    );
}

const DataRoom = [
    {
        no: 1,
        ruang: 'presidential',
        kelas: 'VVIP',
        bed_total: 30,
        BPJS: 'tidak',
        bed_available: 0,
        status: 'tidak tersedia'
    },
    {
        no: 2,
        ruang: 'Luxury',
        kelas: 'I',
        bed_total: 18,
        BPJS: 'tidak',
        bed_available: 0,
        status: 'tidak tersedia'
    },
    {
        no: 3,
        ruang: 'Deluxe',
        kelas: 'II',
        bed_total: 18,
        BPJS: 'iya',
        bed_available: 4,
        status: 'tersedia'
    },
    {
        no: 4,
        ruang: 'Superior',
        kelas: 'III',
        bed_total: 15,
        BPJS: 'iya',
        bed_available: 7,
        status: 'tersedia'
    }
]

export default RoomPage;
