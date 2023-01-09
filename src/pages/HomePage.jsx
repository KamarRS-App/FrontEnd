import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import HeroComponent from '../components/HeroComponent';
import CardFlow from '../components/CardFlow';
import { Box, Text, Flex, Button, useToast } from '@chakra-ui/react';
import TableListHospital from '../components/TableListHospital';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import api from '../services/api';
import apiProvinsi from '../services/apiProvinsi';
import { AuthToken } from '../services/authToken';
import Loading from '../components/Loading';
import Pagination from 'rc-pagination';

const HomePage = () => {
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
  const auth = AuthToken();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [nomor, setNomor] = useState(0);
  const [render, setRender] = useState();

  const searchByNameRef = useRef();

  //hospital api
  const getAllHospitalsHandler = async (pages) => {
    setRender(true);
    await api
      .getHospitals(token, pages)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
        setTotalPage(response.data.total_page);
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
    setRender(false);
    setLoading(false);
  };

  //filter
  const getHospitalByProvinsi = async (page, provinsi) => {
    setRender(true);
    await api
      .getHospitalByProvinsi(token, page, provinsi)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
        setTotalPage(response.data.total_page);
        setNameProvinsi(provinsi);
        if (response.data.total_page === 1) {
          onPagination(1);
        }
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
    setRender(false);
  };

  const getHospitalByKabupaten = async (page, provinsi, kabupaten) => {
    setRender(true);
    await api
      .getHospitalByKabupaten(token, page, provinsi, kabupaten)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
        setNameKota(kabupaten);
        setTotalPage(response.data.total_page);
        if (response.data.total_page === 1) {
          onPagination(1);
        }
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
    setRender(false);
  };

  //search
  const getHospitalByName = async (name, page) => {
    setRender(true);
    await api
      .getHospitalByName(token, name, page)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
        setTotalPage(response.data.total_page);
      })
      .catch((error) => {
        toast({
          position: 'top',
          title: 'Belum ada Rumah Sakit Terdaftar',
          status: 'error',
          duration: '2000',
          isClosable: true,
        });
      });
    setRender(false);
  };

  //region api
  const getProvinsi = async () => {
    await apiProvinsi.getProvinsi().then((response) => {
      const data = response.data.value;
      setProvinsi(data);
    });
  };

  const getKotaKabupatenByProvinsi = async (id) => {
    await apiProvinsi.getKotaKabupateByProvinsi(id).then((response) => {
      const data = response.data.value;
      setKota(data);
    });
  };

  //pagination
  const onPagination = (page) => {
    setCurrentPage(page);
    const selisih = currentPage - page;
    if (page === 1 || totalPage === 1) {
      setNomor(0);
    } else if (page === totalPage) {
      setNomor(totalPage * 10 - 10);
    } else {
      if (selisih < 0) {
        setNomor(Math.abs(selisih * 10 + nomor));
      } else if (selisih > 0) {
        setNomor(Math.abs(selisih * 10 - nomor));
      }
    }
  };

  //search
  const handleSearch = () => {
    const data = searchByNameRef.current.value;
    getHospitalByName(data, 1);
  };

  const onSearchHandler = () => {
    handleSearch();
  };

  //handler filter
  const selectNameProvinsi = (id) => {
    provinsi.filter((data) => {
      if (data.id === id) {
        getHospitalByProvinsi(currentPage, data.name);
      }
    });
  };

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
  };

  const selectNameKota = (id) => {
    kota.filter((data) => {
      if (data.id == id) {
        getHospitalByKabupaten(1, nameProvinsi, data.name);
      }
    });
  };

  const handlerChangeKabupaten = (id) => {
    setSelectKota(id);
    if (id == '') {
      onPagination(1);
      getHospitalByProvinsi(1, nameProvinsi);
    } else {
      selectNameKota(id);
    }
  };

  useEffect(() => {
    if (!auth) {
      toast({
        position: 'top',
        title: 'Kamu Harus Login Dulu',
        status: 'warning',
        duration: '2000',
        isClosable: true,
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
      {loading && <Loading body={'Tunggu Sebentar...'} />}
      {!loading && (
        <Layout isActive={'home'}>
          <HeroComponent />
          <Box px={['20']} my={['20']}>
            <Text fontWeight="600" fontSize={['30px', '48px']} mb={['10']} color="#1FA8F6" textAlign={{ base: 'center', md: 'left' }}>
              Alur Pendaftaran
            </Text>
            <Flex gridTemplateColumns={'repeat(3, 1fr)'} rowGap="20" columnGap="10" flexWrap="wrap" justifyContent="center">
              {flowRegister.map((data) => (
                <CardFlow key={data.no} desc={data.desc} number={data.no} />
              ))}
            </Flex>
          </Box>
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
          <Flex justify={'end'} mx={'20'} mt={'8'}>
            <Pagination defaultCurrent={'1'} current={currentPage} total={totalPage * 10} onChange={onPagination} />
          </Flex>
          <Box textAlign={'center'} mt={'10'} mb={'20'}>
            <Button onClick={() => navigate('/rumahsakit')} bg={'#3AB8FF'} color={'white'} px={'10'} py={'6'} _hover={{ bg: 'alta.primary' }}>
              Telusuri Lebih Banyak
            </Button>
          </Box>
        </Layout>
      )}
    </>
  );
};

const flowRegister = [
  {
    no: 1,
    desc: 'Registrasi pasien rawat inap melalui website',
  },
  {
    no: 2,
    desc: 'Memilih kamar rawat inap berdasarkan rumah sakit dan jenis kamar',
  },
  {
    no: 3,
    desc: 'Melakukan pembayaran pendaftaran pasien rawat inap',
  },
  {
    no: 4,
    desc: 'Mendapatkan email konfirmasi pasien rawat inap',
  },
  {
    no: 5,
    desc: 'Membawa pasien  terdaftar rawat inap ke rumah sakit yang dituju',
  },
];

export default HomePage;
