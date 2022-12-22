import React from 'react';
import { IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

function Payment() {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} align="center">
      <IconButton icon={<Image src="/public/logo/bank-mandiri.png" mb={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
      <IconButton icon={<Image src="/public/logo/bank-bca.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
      <IconButton icon={<Image src="/public/logo/bank-bni.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
      <IconButton icon={<Image src="/public/logo/bri.png" width={20} mx={2} mb={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
      <IconButton icon={<Image src="/public/logo/bank-permata.png" />} colorScheme="white" border="1px" borderColor="gray.200" />
      <IconButton icon={<Image src="/public/logo/bsi.png" width={20} mb={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
    </Stack>
  );
}

export default Payment;
