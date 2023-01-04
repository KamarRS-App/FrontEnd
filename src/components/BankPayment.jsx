import React from 'react';
import { Center, IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import ModalPayment from './ModalPayment';

function BankPayment({onClickBCA}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="row" justifyContent="start" alignItems="center" spacing={2} align="center" ml={10}>
      <Box w={650}>
        <Text fontSize={20} fontWeight={600} color="#152C5B" mb="5">
          Bank Transfer Virtual Account
        </Text>
        <Center>
          <Box w={650}>
            {/* <IconButton icon={<Image src="/logo/bank-mandiri.png" width={53} mb={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" /> */}
            <IconButton onClick={onClickBCA} icon={<Image src="/logo/bank-bca.png" width={53} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bank-bni.png" width={53} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bri.png" width={53} mx={2} mb={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
            <IconButton icon={<Image src="/logo/bank-permata.png" width={84} />} colorScheme="white" border="1px" borderColor="gray.200" />
            {/* <IconButton icon={<Image src="/logo/bsi.png" width={53} mt={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" align="center" /> */}
            <ButtonGroup size="sm" isAttached variant="outline" justifyContent="center" align="center" m={10} mt={10} onClick={onOpen}>
              <IconButton aria-label="next" icon={<ChevronRightIcon w={8} h={8} color="#CDD1E0" />} />
            </ButtonGroup>
          </Box>
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ModalPayment />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default BankPayment;
