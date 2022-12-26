import React from 'react';
import { Center, IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

function Indomeret() {
  return (
    <Stack direction="row" justifyContent="start" alignItems="center" spacing={2} align="center" mt={10} ml={10}>
      <Box w={700}>
        <Text fontSize={20} fontWeight={600} color="#152C5B" mb="5">
          Indomaret
        </Text>
        <Center>
          <Box w="100%">
            <IconButton icon={<Image src="/logo/indomaret.png" width={20} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/i-saku.png" alignItems="center" width={20} align="center" mb={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
          </Box>
        </Center>
      </Box>
    </Stack>
  );
}

export default Indomeret;
