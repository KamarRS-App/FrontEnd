import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Stack, Select, Card, Link } from '@chakra-ui/react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import api from '../services/api';

function CariSpesialis() {
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState(null);
  const [listKabupaten, setListKabupaten] = useState([]);

  const [hospitals, setHospitals] = useState([]);
  const [policlinics, setPoliclinics] = useState([]);
  const [practices, setPractices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [inTime, setInTime] = useState('');

  const [idHospital, setIdHospital] = useState();
  const [time, setTime] = useState();
  const [kuota, setKuota] = useState();
  const [idPoliclinic, setIdPoliclinic] = useState();
  const [idPractices, setIdPractices] = useState();
  const [idDokter, setIdDokter] = useState();
  const [inDate, setInDate] = useState('');

  const date = new Date();
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];

  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const thisDay = date.getDate();
  const yy = date.getFullYear();

  const nextDay = `${yy}-${month < 10 && `0${month}`}-${day < 10 && `0${day}`}`;
  console.log(nextDay);

  const dDay = `${yy}-${month < 10 && `0${month}`}-${date.getDate() < 10 && `0${date.getDate()}`}`;
  console.log(dDay);

  const navigate = useNavigate();

  const token = Cookies.get('token');

  const initialValues = {
    nama: '',
  };

  const [initialValue, setInitialValue] = useState(initialValues);

  //handle data provinsi
  const getProvinsi = async () => {
    await axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi').then((response) => {
      setProvinsi(response.data.provinsi);
      // console.log(response);
    });
  };

  //handle kabupaten/kota
  const getSpecificCity = async (id) => {
    await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`).then((response) => {
      setListKabupaten(response.data.kota_kabupaten);
    });
  };

  const getPractices = async (id) => {
    await api.getAllDailyPractices(token, id).then((response) => {
      const data = response.data.data;
      console.log(data);

      const quota = data.filter((item) => {
        return item.tanggal_praktik === inDate;
      });
      setIdPractices(quota[0]?.id);

      // console.log(quota);
    });
  };

  const getQuota = async (id) => {
    await api.getAllDailyPractices(token, id).then((response) => {
      const data = response.data.data;
      // console.log(data);
      setPractices(data);
      // console.log(quota);
    });
  };

  const getPoliclinics = async () => {
    await api.getAllPoliclinics(token).then((response) => {
      const data = response.data.data;
      setPoliclinics(data);
    });
  };

  const getAllHospitalsHandler = async () => {
    await api.getHospitals(token).then((response) => {
      const data = response.data.data;
      setHospitals(data);
    });
  };

  const getPoliclinic = async (id) => {
    await api.getPoliclinicById(token, id).then((response) => {
      const data = response.data.data;
      setDoctors(data.doctor);
      setTime(data.jam_praktik);
    });
  };

  //Set Filter Poliklinik by Rumah Sakit
  const resultPoliclinic = policlinics.filter((data) => {
    return data.hospital_id == idHospital;
  });

  const handlerPoliclinics = (id) => {
    const resultPoliclinic = policlinics.filter((data) => {
      return data.id == id;
    });
    // console.log(resultPoliclinic);
    setIdPoliclinic(id);
    getPoliclinic(id);
  };

  const handlerTanggal = (e) => {
    setInDate(e);
    getPractices(idPoliclinic);
    getQuota(idPoliclinic);
  };
  const filterQuota = practices.filter((item) => {
    return item.tanggal_praktik === inDate;
  });

  const handlerRegistrasi = () => {
    // getPractices(idPoliclinic);
    console.log(filterQuota[0].id);
    navigate('/reservasi/rawat/jalan', {
      state: {
        idHospital: idHospital,
        idPoliclinic: idPoliclinic,
        idDokter: idDokter,
        date: inDate,
        time: time,
        kuota: kuota,
        practiceId: filterQuota[0].id,
      },
    });
  };

  React.useEffect(() => {
    getProvinsi();
    getAllHospitalsHandler();
    getPoliclinics();
  }, []);

  React.useEffect(() => {
    getSpecificCity(kabupaten);
    // console.log(kabupaten);
  }, [kabupaten]);

  return (
    <Box w="100%" direction={{ base: 'column-reverse', md: 'row' }}>
      <Box align="center" variant="elevated" mx={10} h={200}>
        <Box>
          <Heading fontWeight={600} fontSize={36} color="#1FA8F6">
            {' '}
            Temukan spesialis / klinik{' '}
          </Heading>
        </Box>

        <Box w={688}>
          <Text fontWeight={400} fontSize={18} align="center">
            Temukan spesialis/klinik yang tepat untuk menangani kebutuhan kesehatan Anda. Anda dapat mencari berdasarkan nama, spesialisasi, lokasi rumah sakit, dan jadwal praktik di sini.
          </Text>
        </Box>
      </Box>
      <Box py={'10'} bg="white" width={['1000px']} mx="auto" height="auto">
        <Card shadow="lg" height="auto" py="5" width={['1000px']} borderRadius="xl" alignItems="left" p={20}>
          <form>
            <Stack spacing={3}>
              <Box>
                <Text py={4}> Provinsi</Text>
                <Select placeholder="-- Pilih provinsi --" onChange={(e) => setKabupaten(e.target.value)}>
                  {provinsi?.map((prov) => {
                    return <option value={prov.id}>{prov.nama}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Text py={4}> Kabupaten/Kota</Text>
                <Select placeholder="-- Pilih kabupaten/kota --">
                  {listKabupaten?.map((kota) => {
                    return <option value={kota.nama}>{kota.nama}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Text py={4}> Rumah Sakit</Text>
                <Select onChange={(e) => setIdHospital(e.target.value)} placeholder="-- Pilih Rumah Sakit --" id="hospital_id">
                  {hospitals?.map((data) => {
                    return <option value={data.id}>{data.nama}</option>;
                  })}
                </Select>
              </Box>
              <Box color="#000000">
                <Text py={4}> Poliklinik</Text>
                <Select onChange={(e) => handlerPoliclinics(e.target.value)} placeholder="-- Pilih Poliklinik --">
                  {resultPoliclinic?.map((data) => {
                    return <option value={data.id}>{data.nama_poli}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Text py={4}> Dokter</Text>
                <Select onChange={(e) => setIdDokter(e.target.value)} placeholder="-- Pilih Dokter --">
                  {doctors?.map((data) => {
                    return <option value={data.id}>{data.nama}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Text py={4}> Jam Praktik</Text>
                <Input type="text" value={time} _peerDisabled disabled checked={(e) => setTime(e.target.value)} />
              </Box>
              <Box>
                <Text py={4}> Tanggal Periksa</Text>

                <Input type={'date'} max={nextDay} min={dDay} value={inDate} onChange={(e) => handlerTanggal(e.target.value)} />
              </Box>

              <Box>
                <Text py={4}> Kuota Harian</Text>
                <Input type="text" value={filterQuota[0]?.kuota_harian} _peerDisabled disabled />
              </Box>
            </Stack>

            <Button onClick={() => handlerRegistrasi()} m={20} color="#FFFFFF" bg="#3AB8FF">
              Selanjutnya
            </Button>
          </form>
        </Card>
      </Box>
    </Box>
  );
}

export default CariSpesialis;
