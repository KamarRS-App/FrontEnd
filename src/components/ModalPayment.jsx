import React from 'react';
import { Stack, StackDivider, VStack, Box } from '@chakra-ui/react';
import { Center, Text, SimpleGrid, Image } from '@chakra-ui/react';
function ModalPayment() {
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
      <Center>
        <Text fontSize={16} fontWeight={600} color="#1FA8F6" m="5">
          Selesaikan Pembayaran Dalam 19:59 menit
        </Text>
      </Center>
      <SimpleGrid columns={2} spacing={8} color="#072051">
        <Box h="40px">
          <Image src="/public/logo/bank-bca.png" width={99} />
        </Box>
        <Text>Transfer Bank BCA</Text>

        <Box h="40px">
          <Image src="/public/logo/mandiri.png" width={99} />
        </Box>
        <Text>Transfer Bank Mandiri</Text>
        <Box h="40px">
          <Image src="/public/logo/bank-bni.png" width={99} />
        </Box>
        <Text>Transfer Bank BNI</Text>
        <Box h="40px">
          <Image src="/public/logo/bank-bri.png" width={99} />
        </Box>
        <Text>Transfer Bank BRI</Text>
        <Box h="40px">
          <Image src="/public/logo/permata.png" width={99} />
        </Box>
        <Text>Transfer Bank Permata</Text>
        <Box h="40px">
          <Image src="/public/logo/bank-bsi.png" width={99} />
        </Box>
        <Text>Transfer Bank BSI</Text>
        <Box h="40px">
          <Image src="/public/logo/bank-cimb.png" width={99} />
        </Box>
        <Text>Transfer Bank CIMB Niaga</Text>
        <Box h="40px">
          <Image src="/public/logo/bank.png" width={99} />
        </Box>
        <Text>Transfer Bank Lain</Text>
      </SimpleGrid>
    </VStack>
  );
}

export default ModalPayment;
