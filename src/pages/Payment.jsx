import React, { useEffect, useState } from 'react';
import CardPayment from '../components/CardPayment';
import CardTotalTransfer from '../components/CardTotalTransfer';
import { Flex, Grid, SimpleGrid, Spacer, useToast } from '@chakra-ui/react';
import { Center, Container } from '@chakra-ui/react';
import { Wrap, WrapItem, Heading, Box, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router';
import api from '../services/api';
import Cookies from 'js-cookie';
import Loading from '../components/Loading';

function Payment() {
  // const location = useLocation();
  const kode_daftar = Cookies.get('kode_daftar');
  const token = Cookies.get('token');
  const [paymentMethod, setPaymentMethod] = useState('')
  const [payment, setPayment] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const checkPayment = async () => {
    await api.getPaymentsById(token, kode_daftar)
      .then(response => {
        const data = response.data.data;
        setPaymentMethod(data.payment_method);
        setPayment(data);
        if (data.payment_method !== '') {
          toast({
            position: 'top',
            title: 'Pembayaran telah di buat',
            status: 'warning',
            duration: '2000',
            isClosable: true
          })
          navigate('/registrasi/pembayaran/konfirmasi');
        }
      })
    setLoading(false)
  }

  const paymentHandler = async (metode_pembayaran) => {
    await api.updatePayments(token, kode_daftar, { metode_pembayaran })
      .then(response => {
        const data = response.data.data;
        toast({
          position: 'top',
          title: 'Berhasil memilih pembayaran',
          status: 'success',
          duration: '2000',
          isClosable: true
        })
        navigate('/registrasi/pembayaran/konfirmasi');
        Cookies.set('virtual_account', data.virtual_account);
        Cookies.set('bank_penerima', data.bank_penerima);
        Cookies.set('waktu_kadaluarsa', data.waktu_kedaluarsa);
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkPayment();
    }, 500);
    return () => clearInterval(interval)
  }, []);

  return (
    <>
      {loading && <Loading body={'Tunggu Sebentar'} />}
      {
        !loading &&
        <Layout>
          <Flex
            flexWrap={'wrap'}
            rowGap={'10'}
            columnGap={'10'}
            justify={'space-evenly'}
            mx={{ base: '10', sm: '20', md: '10', lg: '14' }}
            mt={{ base: '28', md: '5' }}
            mb={'20'}
            direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
          >
            <Text
              fontWeight={700}
              fontSize={{ base: '22', sm: '20', md: '24', lg: '30' }}
              color="#1FA8F6"
              flexBasis={'full'}
            >
              Pembayaran Pendaftaran Kamar Rawat Inap
            </Text>
            <Box
            // flexBasis={'60%'}
            >

              <CardPayment
                onClickBCA={() => paymentHandler("transfer_va_bca")}
                onClickBNI={() => paymentHandler("transfer_va_bni")}
                onClickBRI={() => paymentHandler("transfer_va_bri")}
                onClickPermata={() => paymentHandler("transfer_va_permata")}
              // metode_pembayaran={paymentMethod}
              // bank={newBank}
              // imgBank={imgBank}
              // va={va}
              // batas_waktu={<Countdown date={date.getTime() + nextDay.getTime()} renderer={renderer} />}
              />
            </Box>
            <Box
            // flexBasis={'35%'}
            >
              <CardTotalTransfer
                biaya_registrasi={payment?.biaya_registrasi}
                kode_daftar={kode_daftar}
              />
            </Box>
          </Flex>
        </Layout>
      }
    </>
  );
}

export default Payment;
