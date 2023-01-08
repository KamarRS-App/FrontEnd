import React, { useEffect, useRef, useState } from 'react';
import { Center, Td, Th, Tr, useToast } from '@chakra-ui/react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import api from '../services/api';
import { useNavigate } from 'react-router';
import TableListHospital from '../components/TableListHospital';
import apiProvinsi from '../services/apiProvinsi';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import image1 from '../assets/images/rs-mitra-keluarga.png';
import image2 from '../assets/images/rs-haji.png';
import image3 from '../assets/images/rs-sardjito.png';
import Pagination from 'rc-pagination';
import { AuthToken } from '../services/authToken';


function CariRumahSakit() {
  const token = Cookies.get('token');
  const toast = useToast();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [selectProvinsi, setSelectProvinsi] = useState();
  const [nameProvinsi, setNameProvinsi] = useState('');
  const [kota, setKota] = useState([]);
  const [selectKota, setSelectKota] = useState('');
  const [nameKota, setNameKota] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [nomor, setNomor] = useState(0);
  const auth = AuthToken();
  const [render, setRender] = useState();

  const searchByNameRef = useRef();

  //hospital api
  const getAllHospitalsHandler = async (pages) => {
    setRender(true);
    await api.getHospitals(token, pages)
      .then(response => {
        const data = response.data.data;
        setHospitals(data);
        setTotalPage(response.data.total_page)
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setRender(false);
    setLoading(false)
  }

  //filter
  const getHospitalByProvinsi = async (page, provinsi) => {
    setRender(true);
    await api.getHospitalByProvinsi(token, page, provinsi)
      .then(response => {
        const data = response.data.data;
        setHospitals(data);
        setTotalPage(response.data.total_page);
        setNameProvinsi(provinsi)
        if (response.data.total_page === 1) {
          onPagination(1);
        }
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setRender(false);
  }

  const getHospitalByKabupaten = async (page, provinsi, kabupaten) => {
    setRender(true);
    await api.getHospitalByKabupaten(token, page, provinsi, kabupaten)
      .then(response => {
        const data = response.data.data;
        setHospitals(data);
        setNameKota(kabupaten);
        setTotalPage(response.data.total_page)
        if (response.data.total_page === 1) {
          onPagination(1);
        }
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setRender(false);
  }

  const getHospitalByName = async (name, page) => {
    setRender(true);
    await api.getHospitalByName(token, name, page)
      .then(response => {
        const data = response.data.data;
        setHospitals(data);
        setTotalPage(response.data.total_page)
      })
      .catch(error => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true
        });
      })
    setRender(false);
  }

  //region api
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

  //pagination
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

  //handler filter
  //handler filter
  const selectNameProvinsi = (id) => {
    provinsi.filter((data) => {
      if (data.id === id) {
        getHospitalByProvinsi(currentPage, data.name);
      }
    })
  }

  const handlerChangeProvinsi = (id) => {
    setNameProvinsi('');
    if (id == '') {
      onPagination(1);
      getAllHospitalsHandler();
    } else {
      selectNameProvinsi(id);
      getKotaKabupatenByProvinsi(id);
    }
    setSelectKota('');
  }

  const selectNameKota = (id) => {
    kota.filter((data) => {
      if (data.id == id) {
        getHospitalByKabupaten(1, nameProvinsi, data.name);
      }
    })
  }

  const handlerChangeKabupaten = (id) => {
    setSelectKota(id);
    if (id == '') {
      onPagination(1);
      getHospitalByProvinsi(1, nameProvinsi)
    } else {
      selectNameKota(id)
    }
  }

  //search
  const handleSearch = () => {
    const data = searchByNameRef.current.value;
    getHospitalByName(data, 1);
  }

  const onSearchHandler = () => {
    handleSearch();
  }

  useEffect(() => {
    if (!auth) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true
      });
      navigate('/login');
    }
    if (nameProvinsi === '') {
      getAllHospitalsHandler(currentPage);
    } else {
      getHospitalByKabupaten(currentPage, nameProvinsi, nameKota);
    }
    getProvinsi();
  }, [currentPage]);

  return (
    <>
      {loading && <Loading body={'Tunggu Sebentar'} />}
      {
        !loading &&
        <Layout isActive={'hospital'}>
          <Box>
            <Flex direction={{ base:'column-reverse', md:'column-reverse', lg:'row' }} alignItems="center" justify="center" mx={'5'}>
              <Center gap={'10'}>
                <Box color="#1FA8F6" w={['300px', '350px', '500px']} h={['200px', '400px', '400px']} mt={50}>
                  <Heading fontWeight={600} fontSize={['30px', '42px']}>
                    Find Room,
                  </Heading>
                  <Heading fontWeight={600} fontSize={['30px', '42px']}>
                    Save Life
                  </Heading>
                  <Box w={['200px', '350px', '400px']}>
                    <Text fontWeight={400} fontSize={['12px', '18px']} color="#000000" pt={5}>
                      Kami menyediakan pelayanan spesialis terbaik bagi anda dan keluarga
                    </Text>
                  </Box>
                </Box>
              </Center>

              <Box>
                <Flex direction="row" gap="2" wrap="wrap" mt={['50px', '100px', '20px']}>
                  <Image w={['90px', '150px', '200px']} objectFit="cover" src={image1} alt="rs-mitra-keluarga" fallbackSrc="https://via.placeholder.com/150" />
                  <Image w={['90px', '150px', '200px']} objectFit="cover" src={image2} alt="rs-haji-surabaya" fallbackSrc="https://via.placeholder.com/150" />
                  <Image w={['90px', '150px', '200px']} src={image3} alt="rs-sardjito" fallbackSrc="https://via.placeholder.com/150" />
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box my={20}>
            <TableListHospital
              provinsi={provinsi}
              valueProvinsi={selectProvinsi}
              onChangeProvinsi={(e) => handlerChangeProvinsi(e.target.value)}
              kota={kota}
              valueKota={selectKota}
              onChangeKota={(e) => handlerChangeKabupaten(e.target.value)}
              inputRef={searchByNameRef}
              onSearch={onSearchHandler}
              hospitals={hospitals}
              nomor={nomor}
              render={render}
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
          </Box>
        </Layout>
      }
    </>
  );
}

export default CariRumahSakit;
