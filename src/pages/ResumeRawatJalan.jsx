import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { Box, Button, useToast,Center,} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router';

import ReactToPrint from 'react-to-print';
import { PrintComponent } from '../components/PrintComponent';

function ResumeRawatJalan() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get('token');

  let componentRef = useRef();

  const nama = location.state?.nama;
  const jenisKelamin = location.state?.jenisKelamin;
  const noHandphone = location.state?.noHandphone;
  const email = location.state?.email;
  const rumahSakit = location.state?.rumahSakit;
  const poliklinik = location.state?.poliklinik;
  const dokter = location.state?.dokter;
  const tanggalPeriksa = location.state?.tanggalPeriksa;
  const jamPeriksa = location.state?.jamPeriksa;
  const no_antrian = location.state?.no_antrian;

  useEffect(() => {

  }, []);

  return (
    <Layout>
      <Center
        flexDirection={'column'}
        my={'20'}
      >
        <Box>
          <ReactToPrint
            trigger={() =>
              <Box textAlign={'end'} mx={'10'}>
                <Button
                  bg={'#3AB8FF'}
                  color={'white'}
                  _hover={{ bg:'alta.primary' }}
                >
                  Cetak Invoice
                </Button>
              </Box>
            }
            content={() => componentRef}
          />

          <Box
            width={{ base: 'auto', lg: '700px' }}
          >
            <PrintComponent
              ref={(el) => (componentRef = el)}
              nama={nama}
              email={email}
              jenis_kelamin={jenisKelamin}
              no_telpon={noHandphone}
              hospital={rumahSakit}
              policlinic={poliklinik}
              doctor={dokter}
              practice_date={tanggalPeriksa}
              practice_time={jamPeriksa}
              no_antrian={no_antrian}
            />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

export default ResumeRawatJalan;
