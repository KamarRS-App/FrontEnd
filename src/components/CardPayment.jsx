import React from 'react';
import { Box, Button, Center, Flex, Img, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';
import BankPayment from './BankPayment';
import { ViewOffIcon } from '@chakra-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';

function CardPayment({ onClickBCA, metode_pembayaran, bank, va, imgBank, batas_waktu }) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, [])
  return (
    <>
      {
        !metode_pembayaran ?
          <Card
            maxWidth={'700px'}
            mx={'10'}
          >
            <CardHeader>
              <Text fontSize={20} fontWeight={600} m="5">
                Pilih Metode Pembayaran
              </Text>
            </CardHeader>
            <CardBody justifyContent="center" alignItems="center">
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <BankPayment onClickBCA={onClickBCA} />
                </Box>
              </Stack>
            </CardBody>
          </Card>
          :
          <Card
            maxWidth={'500px'}
            mx={'10'}
            px={'5'}
            pb={'10'}
          >
            <CardHeader>
              <Text
                fontSize={16}
                fontWeight={600}
                mb='5'
                color={'#1FA8F6'}
                textAlign={'center'}
              >
                selesaikan pembayaran dalam {batas_waktu}
              </Text>
            </CardHeader>
            <CardBody justifyContent="center" alignItems="center">
              <Flex
                borderBottom={'2px'}
                borderColor={'#B0B0B04D'}
                justify={'space-between'}
              >
                <Text
                  fontSize={'24px'}
                  fontWeight={'600'}
                  color={'#1F81B9'}
                >
                  Transfer {bank}
                </Text>
                <Img src={imgBank} maxWidth={'70px'} />
              </Flex>
              <Box>
                <Text
                  mt={'6'}
                  mb={'10'}
                  lineHeight={'7'}
                >
                  Selesaikan pembayaran dari bank {bank} untuk menyelesaikan
                  pendaftaran rumah sakit pada nomor virtual account di bawah ini.
                </Text>
                <Text>
                  Virtual Account Number
                </Text>
              </Box>
              <InputGroup>
                <Input disabled _disabled={{ border: '1px', borderColor: '#B0B0B04D', color: '#1FA8F6' }} type={'text'} value={va} />
                <InputRightElement width='5rem'>
                  <CopyToClipboard
                    onCopy={onCopy}
                    text={'va'}
                  >
                    <Button
                      color={'#2B4BF2'}
                      bg={'transparent'}
                      _hover={{ bg: "transparent" }}
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </InputRightElement>
              </InputGroup>
            </CardBody>
          </Card>
      }
    </>
  );
}

export default CardPayment;
