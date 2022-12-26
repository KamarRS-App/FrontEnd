import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    ButtonGroup,
} from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai';

const PopupDelete = ({ onDelete, isOpen, onClose, modalTitle, modalBody, deletet_name }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='sm'
        >
            <ModalOverlay />
            <ModalContent
                px={'2'}
                py={'5'}
                borderRadius={'xl'}
            >
                <ModalHeader
                    color={'#1FA8F6'}
                    fontSize='3xl'
                >
                    <AiOutlineInfoCircle />
                    <Text
                        fontSize={'20px'}
                        mt={'5'}
                        fontWeight={'700'}
                        color={'#F32E2E'}
                    >
                        {modalTitle}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {modalBody}
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup
                        
                    >
                        <Button
                            onClick={onClose}
                            width={'150px'}
                            height={'50px'}
                            bg='white'
                            border={'1px'}
                            borderColor={'#56678942'}
                            borderRadius={'xl'}
                        >
                            Cancel
                        </Button>
                        <Button
                            mr={3}
                            onClick={onDelete}
                            bg={'#3AB8FF'}
                            color={'white'}
                            width={'150px'}
                            height={'50px'}
                            _hover={{ bg: 'alta.primary' }}
                            borderRadius={'xl'}
                        >
                            {deletet_name}
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default PopupDelete;
