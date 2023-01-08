import React, { useEffect, useState } from "react";
import { Box, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Stack, Select, Card, Link } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import api from "../services/api";
import Loading from "../components/Loading";

function CariSpesialis() {
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState(null);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [policlinics, setPoliclinics] = useState([]);
  const [practices, setPractices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [idHospital, setIdHospital] = useState();
  const [time, setTime] = useState();
  const [kuota, setKuota] = useState();
  const [idPoliclinic, setIdPoliclinic] = useState();
  const [idPractices, setIdPractices] = useState();
  const [idDokter, setIdDokter] = useState();
  const [inDate, setInDate] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = Cookies.get("token");
  const toast = useToast();

  const date = new Date();
  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const yy = date.getFullYear();
  const nextDay = `${yy}-${month < 10 && `0${month}`}-${day < 10 && `0${day}`}`;
  const dDay = `${yy}-${month < 10 && `0${month}`}-${
    date.getDate() < 10 && `0${date.getDate()}`
  }`;

  //handle data provinsi
  const getProvinsi = async () => {
    await axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        setProvinsi(response.data.provinsi);
        setLoading(false);
      });
  };

  //handle kabupaten/kota
  const getSpecificCity = async (id) => {
    await axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
      )
      .then((response) => {
        setListKabupaten(response.data.kota_kabupaten);
      });
  };

  const getPractices = async (id, practiceDate) => {
    await api
      .getAllDailyPractices(token, id)
      .then((response) => {
        const data = response.data.data;
        data.filter((item) => {
          return item.tanggal_praktik === practiceDate && setPractices(item);
        });
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Jadwal checkup belum tersedia",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const getPoliclinics = async (hospital_id) => {
    await api
      .getAllPoliclinics(token, hospital_id)
      .then((response) => {
        const data = response.data.data;
        setPoliclinics(data);
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Belum Ada Policlinic Terdaftar",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const getAllHospitalsHandler = async () => {
    await api
      .getAllHospitals(token)
      .then((response) => {
        const data = response.data.data;
        setHospitals(data);
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Belum Ada Rumah Sakit Terdaftar",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const getPoliclinic = async (id) => {
    await api.getPoliclinicById(token, id).then((response) => {
      const data = response.data.data;
      setDoctors(data.doctor);
      setTime(data.jam_praktik);
    });
  };

  const handleHospitalChange = (id) => {
    setIdHospital(id);
    getPoliclinics(id);
  };

  const handlerPoliclinics = (id) => {
    setIdPoliclinic(id);
    getPoliclinic(id);
  };

  const handlerTanggal = (e) => {
    setInDate(e);
    getPractices(idPoliclinic, e);
  };

  const handlerRegistrasi = () => {
    navigate("/reservasi/rawat/jalan", {
      state: {
        hospital_id: idHospital,
        policlinic_id: idPoliclinic,
        dokter_id: idDokter,
        date: inDate,
        time: time,
        practice_id: practices.id,
      },
    });
  };

  useEffect(() => {
    getProvinsi();
    getAllHospitalsHandler();
  }, []);

  useEffect(() => {
    getSpecificCity(kabupaten);
  }, [kabupaten]);

  return (
    <>
      {loading ? (
        <Loading body={"Mengambil data..."} />
      ) : (
        <Box w="100%" direction={{ base: "column-reverse", md: "row" }}>
          <Box align="center" variant="elevated" mx={10} h={200}>
            <Box>
              <Heading fontWeight={600} fontSize={36} color="#1FA8F6">
                {" "}
                Temukan spesialis / klinik{" "}
              </Heading>
            </Box>
            <Box w={688}>
              <Text fontWeight={400} fontSize={18} align="center">
                Temukan spesialis/klinik yang tepat untuk menangani kebutuhan
                kesehatan Anda. Anda dapat mencari berdasarkan nama,
                spesialisasi, lokasi rumah sakit, dan jadwal praktik di sini.
              </Text>
            </Box>
          </Box>
          <Box
            py={"10"}
            bg="white"
            maxWidth={["1000px"]}
            mx="auto"
            height="auto"
          >
            <Card
              shadow="lg"
              height="auto"
              py="5"
              maxWidth={["1000px"]}
              borderRadius="xl"
              alignItems="left"
              p={20}
            >
              <form>
                <Stack spacing={3}>
                  <Box>
                    <Text py={4}> Provinsi</Text>
                    <Select
                      placeholder="-- Pilih provinsi --"
                      onChange={(e) => setKabupaten(e.target.value)}
                    >
                      {provinsi?.map((prov) => {
                        return (
                          <option value={prov.id} key={prov.id}>
                            {prov.nama}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <Text py={4}> Kabupaten/Kota</Text>
                    <Select placeholder="-- Pilih kabupaten/kota --">
                      {listKabupaten?.map((kota) => {
                        return (
                          <option value={kota.nama} key={kota.id}>
                            {kota.nama}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <Text py={4}> Rumah Sakit</Text>
                    <Select
                      onChange={(e) => handleHospitalChange(e.target.value)}
                      placeholder="-- Pilih Rumah Sakit --"
                      id="hospital_id"
                    >
                      {hospitals?.map((data) => {
                        return (
                          <option value={data.id} key={data.id}>
                            {data.nama}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box color="#000000">
                    <Text py={4}> Poliklinik</Text>
                    <Select
                      onChange={(e) => handlerPoliclinics(e.target.value)}
                      placeholder="-- Pilih Poliklinik --"
                    >
                      {policlinics?.map((data) => {
                        return (
                          <option value={data.id} key={data.id}>
                            {data.nama_poli}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <Text py={4}> Dokter</Text>
                    <Select
                      onChange={(e) => setIdDokter(e.target.value)}
                      placeholder="-- Pilih Dokter --"
                    >
                      {doctors?.map((data) => {
                        return (
                          <option value={data.id} key={data.id}>
                            {data.nama}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <Text py={4}> Jam Praktik</Text>
                    <Input
                      type="text"
                      placeholder={time}
                      disabled
                      _placeholder={{ color: "#000000" }}
                      _disabled={{ color: "black" }}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <Text py={4}> Tanggal Periksa</Text>

                    <Input
                      type={"date"}
                      max={nextDay}
                      min={dDay}
                      value={inDate}
                      onChange={(e) => handlerTanggal(e.target.value)}
                    />
                  </Box>

                  <Box>
                    <Text py={4}> Kuota Harian</Text>
                    <Input
                      type="text"
                      placeholder={
                        practices.length !== 0
                          ? practices.kuota_harian
                          : "Not Avaible"
                      }
                      _placeholder={{ color: "#000000" }}
                      _disabled={{ color: "black" }}
                      _peerDisabled
                      disabled
                    />
                  </Box>
                </Stack>

                <Button
                  onClick={() => handlerRegistrasi()}
                  my={20}
                  color="#FFFFFF"
                  bg="#3AB8FF"
                  _hover={{ bg: "alta.primary" }}
                  disabled={practices.length !== 0 ? false : true}
                >
                  Selanjutnya
                </Button>
              </form>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CariSpesialis;
