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
} from '@chakra-ui/react'

const PopupAdmin = ({ isOpen, onClose, modalBody, submitButton, formRef }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='xl'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Buat Akun Untuk Admin</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitButton} ref={formRef}>
                    <ModalBody pb={6}>
                        {modalBody}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' type='submit' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default PopupAdmin;
