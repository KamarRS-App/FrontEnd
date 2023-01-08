import React from 'react';
import { Center, Grid, GridItem, IconButton, Stack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { ButtonGroup } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import ModalPayment from './ModalPayment';
import imgBCA from '../assets/images/bank-bca.png';
import imgBNI from '../assets/images/bank-bni.png';
import imgBRI from '../assets/images/bank-bri.png';
import imgPermata from '../assets/images/bank-permata.png';

function BankPayment({ onClickBCA, onClickBNI, onClickBRI, onClickPermata }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="row" justifyContent="start" alignItems="center" align="center">
      <Box>
        <Text fontSize={20} fontWeight={600} color="#152C5B" mb="5">
          Bank Transfer Virtual Account
        </Text>
        <Center>
          <Grid templateColumns={'repeat(5, 1fr)'} width={'full'}>
            <GridItem>
              <IconButton onClick={onClickBCA} icon={<Image src={imgBCA} maxWidth={53} />} p={'3'} colorScheme="white" border="1px" borderColor="gray.200" />
            </GridItem>
            <GridItem>
              <IconButton onClick={onClickBNI} icon={<Image src={imgBNI} maxWidth={53} />} p={'3'} colorScheme="white" border="1px" borderColor="gray.200" />
            </GridItem>
            <GridItem>
              <IconButton onClick={onClickBRI} icon={<Image src={imgBRI} maxWidth={53} />} colorScheme="white" border="1px" borderColor="gray.200" p={'3'} />
            </GridItem>
            <GridItem>
              <IconButton onClick={onClickPermata} icon={<Image src={imgPermata} maxWidth={84} />} colorScheme="white" border="1px" borderColor="gray.200" p={'3'} />
            </GridItem>
            <GridItem>
              <ButtonGroup isAttached variant="outline" justifyContent="center" align="center" onClick={onOpen} px={'3'}>
                <IconButton aria-label="next" icon={<ChevronRightIcon w={8} h={10} color="#CDD1E0" />} />
              </ButtonGroup>
            </GridItem>
          </Grid>
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
