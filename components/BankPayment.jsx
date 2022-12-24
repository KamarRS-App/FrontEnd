import React from 'react';
import { Center, IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Lorem from 'react-lorem-component';
import ModalPayment from './ModalPayment';

function BankPayment() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="row" justifyContent="start" alignItems="center" spacing={2} align="center" mt={10} ml={10}>
      <Box w={900}>
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
            <IconButton icon={<Image src="/logo/bsi.png" width={20} mt={2} mx={2} />} colorScheme="white" margin={2} border="1px" borderColor="gray.200" />
          </Box>
        </Center>
      </Box>
      <ButtonGroup size="sm" isAttached variant="outline" justifyContent="center" alignItems="center" ml={10} mt={10} onClick={onOpen}>
        <IconButton aria-label="next" icon={<ChevronRightIcon w={8} h={8} color="#CDD1E0" />} />
      </ButtonGroup>
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
