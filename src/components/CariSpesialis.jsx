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

  const [inDate, setInDate] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [policlinics, setPoliclinics] = useState([]);
  const [practices, setPractices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [idHospital, setIdHospital] = useState();
  const [time, setTime] = useState();

  const token = Cookies.get('token');

  const initialValues = {
    nama: '',
  };

  const [initialValue, setInitialValue] = useState(initialValues);

  const schema = yup.object().shape({
    provinsi: yup.string().required('Harap pilih provinsi asal'),
    kota: yup.string().required('Harap pilih kabupaten/kota asal'),
    namaRS: yup.string().required('Harap Pilih Rumah Sakit Tujuan'),
    waktuPeriksa: yup.string().required('Harap Pilih Waktu Periksa'),
    tanggalPeriksa: yup.string().required('Harap Pilih Tanggal Periksa'),
    namaPoli: yup.string().required('Harap pilih Nama Poliklinik Tujuan'),
    namaDokter: yup.string().required('Harap pilih Nama Dokter'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
    mode: 'onChange',
  });

  //handle data provinsi
  const getProvinsi = async () => {
    await axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi').then((response) => {
      setProvinsi(response.data.provinsi);
      console.log(response);
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
      setPractices(response.data.kuota_harian);
    });
  };

  const getPoliclinics = async () => {
    await api.getAllPoliclinics(token).then((response) => {
      const data = response.data.data;
      setPoliclinics(data);
    });
  };

  const getAllHospitalsHandler = async () => {
    await api
      .getHospitals(token)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPoliclinic = async (id) => {
    await api
      .getPoliclinicById(token, id)
      .then((response) => {
        const data = response.data.data;
        setDoctors(data.doctor);
        setTime(data.jam_praktik);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handle submit data
  const onSubmit = (values) => {
    const data = new FormData();
    data.append('nama', values.nama);
  };

  const resultPoliclinic = policlinics.filter((data) => {
    return data.hospital_id == idHospital;
  });

  // const resultRegionHospital = resultHospital.filter((data) => {
  //   return data.kabupaten_kota == selectKota;
  // });

  // React.useEffect(() => {
  //   getHospitals(nama);
  //   console.log(nama);
  // }, [nama]);
  const handlerPoliclinics = (id) => {
    getPoliclinic(id);
  };

  const onReservation = () => {
    Router.push({
      pathname: `/bookingpage`,
    });
  };
  React.useEffect(() => {
    getProvinsi();
    getAllHospitalsHandler();
    getPoliclinics();
  }, []);

  React.useEffect(() => {
    getSpecificCity(kabupaten);
    console.log(kabupaten);
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
          <Stack spacing={3}>
            <Box>
              <Text py={4}> Provinsi</Text>
              <Select {...register('provinsi')} placeholder="-- Pilih provinsi --" onChange={(e) => setKabupaten(e.target.value)}>
                {provinsi?.map((prov) => {
                  return <option value={prov.id}>{prov.nama}</option>;
                })}
              </Select>
              <Text color={'red'}>{errors.provinsi?.message}</Text>
            </Box>
            <Box>
              <Text py={4}> Kabupaten/Kota</Text>
              <Select {...register('kota')} placeholder="-- Pilih kabupaten/kota --">
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
              <Select {...register('nama')} placeholder="-- Pilih Dokter --">
                {doctors?.map((data) => {
                  return <option value={data.id}>{data.nama}</option>;
                })}
              </Select>
            </Box>
            <Box>
              <Text py={4}> Jam Praktik</Text>
              <Input type="text" value={time} disabled />
            </Box>
            <Box>
              <Text py={4}> Tanggal Periksa</Text>
              <input type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} />
            </Box>

            <Box>
              <Text>Kuota Harian</Text>
              <Text py={4}>2</Text>{' '}
            </Box>
          </Stack>
        </Card>

        <Button href="/reservasi/rawat/jalan" m={20} color="#FFFFFF" bg="#3AB8FF" submitButton={handleSubmit(onSubmit)}>
          Selanjutnya
        </Button>
      </Box>
    </Box>
  );
}

export default CariSpesialis;
