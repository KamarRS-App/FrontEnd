import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Button } from '@chakra-ui/button';
import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { Img } from '@chakra-ui/image';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Flex, ListItem, OrderedList, Text } from '@chakra-ui/layout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router';
import { paymentBCA, paymentPermata, paymentBRI, paymentBNI } from '../../utils/bankPayment';
import Layout from '../components/Layout';
import api from '../services/api';
import imgBCA from '../assets/images/bank-bca.png';
import imgBNI from '../assets/images/bank-bni.png';
import imgBRI from '../assets/images/bank-bri.png';
import imgPermata from '../assets/images/bank-permata.png';

const LinkPaymentPage = () => {
  const [copied, setCopied] = React.useState(false);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const location = useLocation();
  const [payment, setPayment] = useState();
  const kode_daftar = Cookies.get('kode_daftar');

  const va = Cookies.get('virtual_account');
  const method = Cookies.get('bank_penerima').split(' ');
  const bank = method[1];
  const [imgBank, setImgBank] = useState();
  const date = new Date();
  const nextDay = date.getTime() + 1;

  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  //api
  const checkPayment = async () => {
    await api.getPaymentsById(token, kode_daftar).then((response) => {
      const data = response.data.data;
      setPayment(data);
      if (data.status_pembayaran !== 'pending') {
        Cookies.remove('kode_daftar');
        Cookies.remove('virtual_account');
        Cookies.remove('waktu_kadaluarsa');
        Cookies.remove('bank_penerima');
        navigate('/registrasi/pembayaran/selesai');
      }
    });
  };

  // handle Image Bank
  const handleBank = () => {
    if (bank === 'bca') {
      setImgBank(imgBCA);
    } else if (bank === 'bni') {
      setImgBank(imgBNI);
    } else if (bank === 'bri') {
      setImgBank(imgBRI);
    } else {
      setImgBank(imgPermata);
    }
  };

  const Completionist = () => <span>Link Pembayaran Kadaluarsa</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    handleBank();
    const interval = setInterval(() => {
      checkPayment();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Flex justify={'center'} my={'20'}>
        <Card maxWidth={'550px'} border={'1px'} borderColor={'#B0B0B0'} mx={'auto'} px={'5'} pb={'10'}>
          <CardHeader>
            <Text fontSize={16} fontWeight={600} mb="5" color={'#1FA8F6'} textAlign={'center'}>
              selesaikan pembayaran dalam <Countdown date={Date.now() + nextDay} renderer={renderer} />
            </Text>
          </CardHeader>
          <CardBody justifyContent="center" alignItems="center">
            <Flex borderBottom={'2px'} borderColor={'#B0B0B04D'} justify={'space-between'} pb={'5'}>
              <Text fontSize={'24px'} fontWeight={'600'} color={'#1F81B9'}>
                Transfer {bank.toUpperCase()}
              </Text>
              <Img src={imgBank} maxWidth={'100px'} objectFit={'contain'} />
            </Flex>
            <Box>
              <Text mt={'6'} mb={'10'} lineHeight={'7'}>
                Selesaikan pembayaran dari bank {bank.toUpperCase()} untuk menyelesaikan pendaftaran rumah sakit pada nomor virtual account di bawah ini.
              </Text>
              <Text>Virtual Account Number</Text>
            </Box>
            <InputGroup>
              <Input disabled _disabled={{ border: '1px', borderColor: '#B0B0B04D', color: '#1FA8F6' }} type={'text'} value={va} />
              <InputRightElement width="5rem">
                <CopyToClipboard onCopy={onCopy} text={va}>
                  <Button color={'#2B4BF2'} bg={'transparent'} _hover={{ bg: 'transparent' }}>
                    Copy
                  </Button>
                </CopyToClipboard>
              </InputRightElement>
            </InputGroup>
            <Box mb={'5'} mt={'10'}>
              <Text fontSize={'lg'} fontWeight={'bold'} mb={'5'}>
                Ikuti intruksi pembayaran di bawah ini:
              </Text>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Pembayaran melalui ATM {bank.toUpperCase()}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <OrderedList>
                    {bank === 'bca' &&
                      paymentBCA.atm.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                    {bank === 'bni' &&
                      paymentBNI.atm.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                    {bank === 'bri' &&
                      paymentBRI.atm.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                    {bank === 'permata' &&
                      paymentPermata.atm.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                  </OrderedList>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Pembayaran melalui m-Banking {bank.toUpperCase()}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <OrderedList>
                    {bank === 'bca' &&
                      paymentBCA.mBanking.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                    {bank === 'bni' &&
                      paymentBNI.mBanking.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                    {bank === 'bri' &&
                      paymentBRI.mBanking.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                    {bank === 'permata' &&
                      paymentPermata.mBanking.map((data, index) => (
                        <AccordionPanel pb={4}>
                          <ListItem>{` ${data.desc} ${index === 2 ? va : ''}`}</ListItem>
                        </AccordionPanel>
                      ))}
                  </OrderedList>
                </AccordionItem>
              </Accordion>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </Layout>
  );
};

export default LinkPaymentPage;
