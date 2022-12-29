import React from 'react';
import { Stack, StackDivider, VStack, Box } from '@chakra-ui/react';
import { Center, Text, SimpleGrid, Image, Grid, Button, Card, IconButton, ButtonGroup } from '@chakra-ui/react';
import { ArrowForwardIcon, AddIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ModalTambahPasien from '../components/ModalTambahPasien';

function ModalDataPasien() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
      <Box>
        <Text fontSize={16} fontWeight={600} color="#1FA8F6" mt={5}>
          Pilih Profil Pasien
        </Text>
      </Box>
      <Grid>
        <Text>Diri Sendiri</Text>

        <Button Align="left" color="#8A8989" mt={5} rightIcon={<ArrowForwardIcon />} colorScheme="teal" w="full" variant="outline" h={50}>
          <Avatar bg="#BEBEBE" size="sm" mx={5} />
          <Text>Almira Mahsa</Text>
        </Button>
        <Center>
          {' '}
          <Text mt={10} color="#CDD1E0">
            Belum ada data lain
          </Text>
        </Center>
        <StackDivider borderColor="gray.200" />
        <Center>
          <ButtonGroup size="sm" isAttached variant="unstyled" mt={10} mb={5} color="#072051">
            <Button>Tambah Data Pasien Baru</Button>
            <IconButton aria-label="Tambah Data Baru" icon={<AddIcon />} onClick={onOpen} />
          </ButtonGroup>
        </Center>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <ModalTambahPasien />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Grid>
    </VStack>
  );
}

export default ModalDataPasien;
