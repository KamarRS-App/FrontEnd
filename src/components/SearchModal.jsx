import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React from 'react';

const SearchModal = ({isOpen, onClose, searchRef, onSearch}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pencarian Rumah Sakit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input ref={searchRef} placeholder={'Cari Rumah Sakit'} />
                </ModalBody>

                <ModalFooter>
                    <Button bg={'#3AB8FF'} _hover={{ bg:'alta.primary' }} color={'white'} mr={3} onClick={onSearch}>
                        Cari Rumah Sakit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SearchModal;
