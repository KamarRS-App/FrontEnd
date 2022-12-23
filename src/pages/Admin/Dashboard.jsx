import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';
import CardAdmin from '../../components/CardAdmin';
import ChartPatient from '../../components/ChartPatient';
import { dataPatient } from '../../../utils/Data';

const Dashboard = () => {
    return (
        <Flex
            wrap='wrap'
        >
            <Box
                width='full'
            >
                <NavbarAdmin />
            </Box>
            <Box
                maxWidth='500px'
                width={{ base:'10%', md:'25%' }}
                borderRight='1px'
                borderColor='#CDD1E0'
                minHeight='87vh'
            >
                <SideBarAdmin />
            </Box>
            <Box
                width={{ base:'90%',sm:'90%',md:'75%', lg:'75%' }}
                bg='#FAFAFA'
            >
                <Flex
                    my='10'
                    gap='10'
                    justify='center'
                    wrap='wrap'
                >
                    <CardAdmin />
                    <CardAdmin />
                    <CardAdmin />
                    <CardAdmin />
                    <Box
                        width='100%'
                        bg='white'
                        p='10'
                    >
                        <ChartPatient chartData={dataPatient} />
                    </Box>
                </Flex>

            </Box>
        </Flex>
    );
}

export default Dashboard;
