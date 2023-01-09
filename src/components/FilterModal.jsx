import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import React from 'react';

const FilterModal = ({ dataSelect1, isOpen, onClose, onChangeSelect1, valueSelect1, onChangeSelect2, valueSelect2, onFilter, dataSelect2, showSelect1, titleSelect1, titleSelect2 }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Filter Rumah Sakit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>{titleSelect1}</FormLabel>
                        <Select
                            placeholder={titleSelect1}
                            shadow="md"
                            borderRadius="md"
                            onChange={onChangeSelect1}
                            value={valueSelect1}
                        >
                            {
                                dataSelect1?.map(data => (
                                    <option value={data.id} key={data.id}>{data.name || data.nama}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl mt={'5'} display={showSelect1}>
                        <FormLabel>{titleSelect2}</FormLabel>
                        <Select
                            placeholder={titleSelect2}
                            shadow="md"
                            borderRadius="md"
                            onChange={onChangeSelect2}
                            value={valueSelect2}
                        >
                            {
                                dataSelect2?.map(data => (
                                    <option value={data.id} key={data.id}>{data.name}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button bg={'#3AB8FF'} _hover={{ bg: 'alta.primary' }} color={'white'} mr={3} onClick={onFilter}>
                        Terapkan Filter
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default FilterModal;
