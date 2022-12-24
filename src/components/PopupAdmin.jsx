import React, { useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
} from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai';

const PopupAdmin = ({ isOpen, onClose, modalBody, submitButton, modalTitle }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='xl'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    color={'#1FA8F6'}
                    fontSize='3xl'
                >
                    <AiOutlineInfoCircle />
                    <Text
                        fontSize={'20px'}
                        mt={'5'}
                    >
                        {modalTitle}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitButton}>
                    <ModalBody pb={6}>
                        {modalBody}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' type='submit' mr={3}>
                            Simpan
                        </Button>
                        {/* <Button onClick={onClose}>Cancel</Button> */}
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default PopupAdmin;
