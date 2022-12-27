import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import CardAdmin from '../../components/CardAdmin';
import ChartPatient from '../../components/ChartPatient';
import { dataPatient } from '../../../utils/Data';
import LayoutAdmin from '../../components/LayoutAdmin';

const Dashboard = () => {
    return (
        <LayoutAdmin activeMenu={'dashboard'}>
            <Flex
                    gap='10'
                    justify='space-between'
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
        </LayoutAdmin>
    );
}

export default Dashboard;
