import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
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

  setHospitals;
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
  const getDoctors = async (token) => {
    await api.getAllDoctors(token).then((response) => {
      const data = response.data.nama;
      setDoctors(response.data.nama);
    });
  };
  const getPoliclinics = async () => {
    await api.getAllPoliclinics().then((response) => {
      const data = response.data.data;
      setValue('policlinic_id', data.policlinic_id);
      setValue('nama_poli', data.nama_poli);
      setValue('jam_praktik', data.jam_praktik);
    });
  };

  const getHospitals = async (id) => {
    await api
      .getHospitalByID(token, id)
      .then((response) => {
        const data = response.data.data;
        setHospitals(response.data.nama);

        if (data) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Data Tersedia',
            showConfirmButton: false,
            timer: 1500,
          });
          getHospitals();
        }
      })

      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Data Tersedia',
          showConfirmButton: true,
        });
      });
  };

  //handle submit data
  const onSubmit = (values) => {
    const data = new FormData();
    data.append('nama', values.nama);

    React.useEffect(() => {
      getProvinsi();
    }, []);

    React.useEffect(() => {
      getSpecificCity(kabupaten);
      console.log(kabupaten);
    }, [kabupaten]);

    React.useEffect(() => {
      getHospitals(nama);
      console.log(nama);
    }, [nama]);

    useEffect(() => {
      if (role !== 'super admin' && token === undefined) {
        toast({
          position: 'top',
          title: 'Kamu Harus Login Dulu',
          status: 'warning',
          duration: '2000',
          isClosable: true,
        });
        navigate('/root/login');
      }
      getHospitals();

      const onReservation = () => {
        Router.push({
          pathname: `/bookingpage`,
        });
      };
    }, []);
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
                <Select {...register('nama')} placeholder="-- Pilih Rumah Sakit --" id="hospital_id">
                  {hospitals?.map((data) => {
                    return <option value={data.id}>{data.nama}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Text py={4}> jam_praktik</Text>
                <Select {...register('jam_praktik')} placeholder="-- Pilih Jam Praktik --" id="jam_praktik">
                  {policlinics?.map((data) => {
                    return <option value={data.id}>{data.jam_praktik}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Text py={4}> Tanggal Periksa</Text>
                <input type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} />
              </Box>
              <Box>
                <Text py={4}> Poliklinik</Text>
                <Select {...register('nama')} placeholder="-- Pilih Poliklinik --">
                  {hospitals?.map((data) => {
                    return <option value={data.id}>{data.nama}</option>;
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
                <Text>Kuota Harian</Text>
                <Text py={4}>2</Text>{' '}
              </Box>
            </Stack>
          </Card>

          <Button href="/reservasi/rawat/jalan" m={20} color="#FFFFFF" bg="#3AB8FF" submitButton={handleSubmit(onSubmit, onError)}>
            Selanjutnya
          </Button>
        </Box>
      </Box>
    );
  };
}

export default CariSpesialis;
