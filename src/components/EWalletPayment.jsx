import React from 'react';
import { Center, IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import Pembatas from './pembatas';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
function EWalletPayment() {
  return (
    <Stack direction="row" justifyContent="start" alignItems="center" spacing={2} align="center" mt={10} ml={10}>
      <Box w={800}>
        <Text fontSize={20} fontWeight={600} color="#152C5B" mb="5">
          E-Wallet
        </Text>
        <Center>
          <Box w="100%">
            <IconButton icon={<Image src="/logo/gopay.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/ovo.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/dana.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/qris.png" mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/shopee.png" width={20} mx={2} />} colorScheme="white" border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/Link.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
          </Box>
        </Center>
      </Box>
      <ButtonGroup size="sm" isAttached variant="outline" justifyContent="center" alignItems="center" ml={10} mt={10}>
        <IconButton aria-label="next" icon={<ChevronRightIcon w={8} h={8} color="#CDD1E0" />} />
      </ButtonGroup>
    </Stack>
  );
}

export default EWalletPayment;
