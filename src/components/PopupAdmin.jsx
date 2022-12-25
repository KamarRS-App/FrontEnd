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
            <ModalContent
                px={'10'}
                py={'5'}
                borderRadius={'3xl'}
            >
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
                    <ModalBody pb={20}>
                        {modalBody}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type='submit'
                            mr={3}
                            bg='#3AB8FF'
                            color={'white'}
                            fontSize={'14px'}
                            fontWeight={'700'}
                            width={'150px'}
                            height={'50px'}
                            _hover={{ bg:'alta.primary' }}
                        >
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
