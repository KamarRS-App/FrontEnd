import React, { useEffect } from 'react';
import '../../components/style/pagination.css';
import { MdModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Select,
  Input,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from '@chakra-ui/react';
import Pagination from 'rc-pagination';
import LayoutAdmin from '../../components/LayoutAdmin';
import searchIcon from '../../assets/images/searchIcon.svg';
import HeadAdmin from '../../components/HeadAdmin';
import { useDisclosure } from '@chakra-ui/hooks';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';

function DashboardDailyPraktek() {
  const token = Cookies.get('token');
  const role = Cookies.get('role');
  const id = Cookies.get('id');
  const toast = useToast();
  const navigate = useNavigate();
  const [policlinics, setPoliclinics] = React.useState();
  const [selectedPoli, setSelectedPoli] = React.useState();
  const [practiceList, setPracticeList] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [selectedPractice, setSelectedPractice] = React.useState();
  const [hospitalId, setHospitalId] = React.useState();
  const [listPoli, setListPoli] = React.useState();
  // ================ PAGINATION ====================
  //change page
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  // ================ MENAMBAHKAN DAILY PRACTICE ====================
  //modal controller
  const { isOpen: isModalCreateOpen, onOpen: onModalCreateOpen, onClose: onCloseModalCreate } = useDisclosure();

  //schema validation
  const schema = yup.object({
    policlinic_id: yup.number().typeError('Harap masukkan id klinik'),
    tanggal_praktik: yup.string().required('Harap masukkan tanggal praktik'),
    kuota_harian: yup.number().typeError('Harap masukkan kuota yang tersedia'),
    status: yup.string().required('Harap masukkan status sekarang'),
  });

  //rhf configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  //handle send the data
  const sendData = async (data) => {
    await api
      .createDailyPractice(token, data)
      .then((response) => {
        toast({
          title: `Berhasil mendaftarkan data praktek harian`,
          status: 'success',
          position: 'top',
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((err) => {
        toast({
          title: `Gagal menambahkan data praktek harian`,
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 1500,
        });
      });
  };

  //submit data
  const onSubmit = (data) => {
    sendData(data);
  };

  // =============== EDIT DATA DAILY PRACTICE ======================
  // modal controller
  const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onCloseModalEdit } = useDisclosure();

  //edit inputan handler
  const editDataPraktik = (e) => {
    const newData = { ...selectedPractice };
    newData[e.target.id] = e.target.value;
    setSelectedPractice(newData);
  };

  //send new data
  const confirmEditHandler = async (token, id, data) => {
    await api
      .updateDailyPractice(token, id, data)
      .then((response) => {
        toast({
          title: `Berhasil memperbaharui data.`,
          status: 'success',
          position: 'top',
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((err) => {
        toast({
          title: `Gagal memperbaharui data.`,
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 1500,
        });
      });
  };

  // ======= MENGAMBIL DATA STAFF SEBELUM SET POLIKLINIK ===========
  const getHospitalIdFromAdmin = async (token, id) => {
    await api.getAdminById(token, id).then((response) => {
      setHospitalId(response.data.data.hospital_id);
    });
  };

  // =============== MENGAMBIL DATA TIAP POLI ======================
  //mengambil data tiap poliklinik
  const getPoliklinikList = async (token, id) => {
    await api.ngambilPoliklinikBerdasarkanHospital(token, id).then((response) => {
      setPoliclinics(response.data.data);
    });
  };

  // =============== MENGAMBIL DATA DAILY PRACTICE TIAP POLI ======================
  //mengambil data page pertama
  const getDailyPracticeByPoliclinic = async (token, id) => {
    await api
      .getAllDailyPractices(token, id)
      .then((response) => {
        setTotalPage(response.data.total_page);
        setPracticeList(response.data.data);
      })
      .catch((err) => {
        toast({
          title: `Gagal mengambil data praktek.`,
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 1500,
        });
      });
  };

  //mengambil data next page
  const getNextDailyPracticeList = async (token, id, page) => {
    await api
      .getNextPageDailyPractice(token, id, page)
      .then((response) => {
        setPracticeList(response.data.data);
      })
      .catch((err) => {
        toast({
          title: `Gagal mengambil data selanjutnya.`,
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 1500,
        });
      });
  };

  //set policlinic list utk ditmabahkan
  const ngambilBuatNambahin = () => {
    setListPoli(policlinics);
  };

  //============== USE EFFECT ========================
  useEffect(() => {
    // check apakah udah login
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
    getHospitalIdFromAdmin(token, id);
    // get data tiap poliklinik
  }, []);

  useEffect(() => {
    setListPoli(policlinics);
  }, [policlinics]);

  useEffect(() => {
    if (hospitalId) {
      getPoliklinikList(token, hospitalId);
    }
  }, [hospitalId]);

  //check perubahan pada page, lanjutkan dengan ngambil data selanjutnya/sebelumnya
  useEffect(() => {
    if (selectedPoli) {
      getNextDailyPracticeList(token, selectedPoli, currentPage);
    }
  }, [currentPage]);

  return (
    <LayoutAdmin activeMenu={'praktek'}>
      <HeadAdmin
        title="Manajemen Praktek"
        isAdd={() => {
          onModalCreateOpen();
          ngambilBuatNambahin();
        }}
        showSearch={'none'}
        showFilter={'none'}
      />
      <Box>
        <Box backgroundColor="white" mt={5} minH="600px" p={5}>
          <Box>
            <Flex justifyContent={'end'}>
              <Select
                placeholder="-- Pilih Poli --"
                w={'200px'}
                onChange={(e) => {
                  setSelectedPoli(e.target.value);
                  setCurrentPage(1);
                  setPracticeList('');
                }}
              >
                {policlinics?.map((policlinic) => {
                  return (
                    <option value={policlinic.id} key={policlinic.id}>
                      {policlinic.nama_poli}
                    </option>
                  );
                })}
              </Select>
              <Button
                colorScheme="blue"
                ml="5"
                onClick={() => {
                  getDailyPracticeByPoliclinic(token, selectedPoli);
                  setCurrentPage(1);
                }}
              >
                <Image src={searchIcon} />
              </Button>
            </Flex>
          </Box>
          <Box mt={10}>
            {practiceList ? (
              <>
                <TableContainer textAlign={'center'} h={'480'} overflowY={'true'}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>No</Th>
                        <Th>Tanggal Praktik</Th>
                        <Th>Kuota Harian</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {practiceList?.map((practice, index) => {
                        return (
                          <Tr key={index + 1}>
                            <Td>{index + 1}</Td>
                            <Td>{practice.tanggal_praktik}</Td>
                            <Td>{practice.kuota_harian}</Td>
                            <Td>{practice.status === 'Available' ? <Badge colorScheme="green">AVAILABLE</Badge> : <Badge colorScheme="red">NOT AVAILABLE</Badge>}</Td>
                            <Td>
                              <Button
                                bg="transparent"
                                border="1px"
                                borderColor={'#E0E0E0'}
                                onClick={() => {
                                  onModalEditOpen();
                                  setSelectedPractice(practice);
                                }}
                              >
                                <MdModeEdit />
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Box textAlign={'center'} mt={5}>
                  <Pagination total={totalPage * 10} onChange={onChangePage} current={currentPage} defaultCurrent={1} />
                </Box>
              </>
            ) : (
              <Box textAlign={'center'} fontSize={'xl'}>
                <Text>Tidak ada data.</Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* modal mengedit data daily praktek */}
      <Modal isOpen={isModalEditOpen} onClose={onCloseModalEdit} isCentered size={{ base: 'xs', sm: 'sm', md: 'lg', lg: '2xl' }}>
        <ModalOverlay />
        <ModalContent px={{ base: '5', sm: '8', md: '10' }} py={'5'} borderRadius={'3xl'}>
          <ModalHeader color={'#1FA8F6'} fontSize="3xl">
            Edit Data Praktek
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tanggal Praktek</FormLabel>
              <Input id="tanggal_praktik" type="date" name="tanggal_praktik" value={selectedPractice?.tanggal_praktik} onChange={(e) => editDataPraktik(e)} />
            </FormControl>
            <FormControl>
              <FormLabel>Kuota Harian</FormLabel>
              <Input placeholder="Kuota Harian" id="kuota_harian" type="number" name="kuota_harian" value={selectedPractice?.kuota_harian} onChange={(e) => editDataPraktik(e)} />
            </FormControl>
            <FormControl>
              <FormLabel>Status:</FormLabel>
              <Select
                id="status"
                placeholder="-- Pilih Status --"
                name="status"
                onChange={(e) => {
                  editDataPraktik(e);
                }}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              bg="#3AB8FF"
              color={'white'}
              fontSize={'14px'}
              fontWeight={'700'}
              width={'150px'}
              height={'50px'}
              _hover={{ bg: 'alta.primary' }}
              onClick={() => {
                confirmEditHandler(token, selectedPractice.id, selectedPractice);
              }}
            >
              Ubah
            </Button>{' '}
            <Button mr={3} bg="#3AB8FF" color={'white'} fontSize={'14px'} fontWeight={'700'} width={'150px'} height={'50px'} _hover={{ bg: 'alta.primary' }} onClick={onCloseModalEdit}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal menambahkan daily praktek */}
      <Modal isOpen={isModalCreateOpen} onClose={onCloseModalCreate} size={{ base: 'xs', sm: 'sm', md: 'lg', lg: '2xl' }} isCentered>
        <ModalOverlay />
        <ModalContent px={{ base: '5', sm: '8', md: '10' }} py={'5'} borderRadius={'3xl'}>
          <ModalHeader color={'#1FA8F6'} fontSize="3xl">
            <Text>Tambah Data Praktek Harian</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={20}>
            <FormControl isInvalid={errors.policlinic_id}>
              <FormLabel>ID Poliklinik</FormLabel>
              <Select {...register('policlinic_id')} id="policlinic_id" name="policlinic_id">
                {listPoli?.map((poli) => {
                  return (
                    <option value={poli.id} label={poli.nama_poli} key={poli.id}>
                      {poli.nama_poli}
                    </option>
                  );
                })}
              </Select>
              {/* <Input
                {...register("policlinic_id")}
                placeholder="ID Poliklinik"
                id="policlinic_id"
                type="number"
                name="policlinic_id"
              /> */}
              {errors.policlinic_id && <FormErrorMessage>{errors.policlinic_id?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.tanggal_praktik}>
              <FormLabel>Tanggal Praktik</FormLabel>
              <Input {...register('tanggal_praktik')} id="tanggal_praktik" type="date" name="tanggal_praktik" />
              {errors.tanggal_praktik && <FormErrorMessage>{errors.tanggal_praktik?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.kuota_harian}>
              <FormLabel>Kuota Harian</FormLabel>
              <Input {...register('kuota_harian')} placeholder="Masukkan kuota harian" id="kuota_harian" type="number" name="kuota_harian" />
              {errors.kuota_harian && <FormErrorMessage>{errors.kuota_harian?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.status}>
              <FormLabel>Status</FormLabel>
              <Select {...register('status')} id="status" name="status" placeholder={'-- Pilih status --'} defaultValue={'Available'}>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </Select>
              {errors.status && <FormErrorMessage>{errors.status?.message}</FormErrorMessage>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit(onSubmit)} mr={3} bg="#3AB8FF" color={'white'} fontSize={'14px'} fontWeight={'700'} width={'150px'} height={'50px'} _hover={{ bg: 'alta.primary' }}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutAdmin>
  );
}

export default DashboardDailyPraktek;
