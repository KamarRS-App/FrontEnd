import React from 'react';
import { Center, IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

function Payment() {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} align="center">
      <Box>
        <Text fontSize={20} fontWeight={600} color="#152C5B" mb="5">
          Bank Transfer
        </Text>
        <Center>
          <Box w="100%">
            <IconButton icon={<Image src="/logo/bank-mandiri.png" mb={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bank-bca.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bank-bni.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bri.png" width={20} mx={2} mb={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bank-permata.png" />} colorScheme="white" border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bsi.png" width={20} mb={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
          </Box>
        </Center>
      </Box>
    </Stack>
  );
}

export default Payment;
