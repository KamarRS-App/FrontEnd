import React from 'react';
import { Box, Button, Center, Flex, Img, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';
import BankPayment from './BankPayment';

function CardPayment({ onClickBCA, onClickBNI, onClickBRI, onClickPermata }) {
  return (
    <Card maxWidth={{ md: '500px', lg: '570px', xl: '700px' }} py={'10'}>
      <CardHeader>
        <Text fontSize={20} fontWeight={600}>
          Pilih Metode Pembayaran
        </Text>
      </CardHeader>
      <CardBody justifyContent="center" alignItems="center">
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <BankPayment onClickBCA={onClickBCA} onClickBNI={onClickBNI} onClickBRI={onClickBRI} onClickPermata={onClickPermata} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default CardPayment;
