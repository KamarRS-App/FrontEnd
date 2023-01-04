import React from 'react';
import { Stack, StackDivider, VStack, Box } from '@chakra-ui/react';
import { Center, Text, SimpleGrid, Image } from '@chakra-ui/react';
function ModalPayment() {
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" my={10}>
      <SimpleGrid columns={2} spacing={8} color="#072051" align="center">
        <Box h="40px">
          <Image src="/public/logo/bank-bca.png" width={53} />
        </Box>
        <Text>Transfer Bank BCA</Text>
        <Box h="40px">
          <Image src="/public/logo/bank-bni.png" width={53} />
        </Box>
        <Text>Transfer Bank BNI</Text>
        <Box h="40px">
          <Image src="/public/logo/bank-bri.png" width={53} />
        </Box>
        <Text>Transfer Bank BRI</Text>
        <Box h="40px">
          <Image src="/public/logo/permata.png" width={66} />
        </Box>
        <Text>Transfer Bank Permata</Text>
      </SimpleGrid>
    </VStack>
  );
}

export default ModalPayment;
