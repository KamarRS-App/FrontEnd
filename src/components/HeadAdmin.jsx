import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';

const HeadAdmin = ({ title }) => {
    return (
        <Flex
            justify='space-between'
            bg='white'
            p='10'
        >
            <Text
                fontSize={'20px'}
                fontWeight={'600'}
                color={'#1FA8F6'}
            >
                {title}
            </Text>
            <Flex
                color={'#333333'}
                gap='5'
            >
                <Button
                bg='transparent'
                border='1px'
                borderColor={'#E0E0E0'}
                >
                    <IoAddOutline
                        fontSize={'30px'}
                    />
                </Button>
                <Button
                bg='transparent'
                border='1px'
                borderColor={'#E0E0E0'}
                >
                    <CiSearch
                        fontSize={'30px'}
                    />
                </Button>
                <Button
                bg='transparent'
                border='1px'
                borderColor={'#E0E0E0'}
                >
                    <CiFilter
                        fontSize={'32px'}
                    />
                </Button>
            </Flex>
        </Flex>
    );
}

export default HeadAdmin;
