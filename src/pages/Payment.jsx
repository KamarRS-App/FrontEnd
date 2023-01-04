import React, { useState } from 'react';
import CardPayment from '../components/CardPayment';
import CardTotalTransfer from '../components/CardTotalTransfer';
import { Flex, Grid, SimpleGrid, Spacer } from '@chakra-ui/react';
import { Center, Container } from '@chakra-ui/react';
import { Wrap, WrapItem, Heading, Box, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useLocation } from 'react-router';
import api from '../services/api';
import Cookies from 'js-cookie';
import Countdown from 'react-countdown';

function Payment() {
  const location = useLocation();
  const kode_daftar = location.state?.payment.Kode_daftar;
  const token = Cookies.get('token');
  const [paymentMethod, setPaymentMethod] = useState()
  const [bank, setBank] = useState('');
  const [imgBank, setImgBank] = useState('');
  const [va, setVa] = useState('');
  const [expired, setExpired] = useState();

  // console.log(location.state?.payment)

  const onBCAPayment = () => {
    const metode_pembayaran = "transfer_va_bni";
    paymentHandler(metode_pembayaran);
    const check = paymentHandler(metode_pembayaran);
  }

  const paymentHandler = async (metode_pembayaran) => {
    await api.updatePayments(token, kode_daftar, { metode_pembayaran })
      .then(response => {
        console.log(response);
        const data = response.data.data;
        setVa(data.virtual_account)
        setPaymentMethod(data.bank_penerima);
        setBank(data.bank_penerima);
        setImgBank('/logo/bank-bca.png')
        setExpired(data.waktu_kadaluarsa)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const Completionist = () => <span>Link Pembayaran Kadaluarsa</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <Layout>
      <Flex
        flexWrap={'wrap'}
        rowGap={'20'}
        justify={'space-evenly'}
        mx={'20'}
        mt={'5'}
        mb={'20'}
      >
        <Countdown date={Date.now() + 1 * 24 * 60 * 60 * 1000} renderer={renderer} />
        <Text
          fontWeight={700}
          fontSize={30}
          color="#1FA8F6"
          flexBasis={'full'}
        >
          Pembayaran Pendaftaran Kamar Rawat Inap
        </Text>
        <Box
          flexBasis={'60%'}
        >
          <CardPayment
            onClickBCA={() => onBCAPayment()}
            metode_pembayaran={paymentMethod}
            bank={'Bank BCA'}
            imgBank={'/logo/bank-bca.png'}
            va={'9987654521'}
            batas_waktu={expired}
          />
        </Box>
        <Box
          flexBasis={'35%'}
        >
          <CardTotalTransfer
            biaya_registrasi={location.state?.payment.biaya_registrasi}
            kode_daftar={kode_daftar}
          />
        </Box>
      </Flex>
    </Layout>
  );
}

export default Payment;
