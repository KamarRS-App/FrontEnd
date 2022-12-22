import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/layout';
import React from 'react';

const SideBarAdmin = () => {
    return (
        <UnorderedList
            listStyleType='none'
            py='16'
            mr='10'
            ml='0'
        >
            <ListItem
                bg='#1FA8F642'
                px='16'
                color='#0EA7FF'
            >
                Dashboard
            </ListItem>
            <ListItem
                px='16'
            >
                Admin
            </ListItem>
            <ListItem
                px='16'
            >
                Room
            </ListItem>
            <ListItem
                px='16'
            >
                Patient
            </ListItem>
            <ListItem
                px='16'
            >
                Doctor
            </ListItem>
            <ListItem
                px='16'
            >
                Rumah Sakit
            </ListItem>
        </UnorderedList>
    );
}

export default SideBarAdmin;
