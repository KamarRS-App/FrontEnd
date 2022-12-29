import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { dataPatient } from '../../../utils/Data';
import CardAdmin from '../../components/CardAdmin';
import ChartPatient from '../../components/ChartPatient';
import LayoutAdminRoot from '../../components/LayoutAdminRoot';

const DashboardRoot = () => {
    const dateNow = new Date();
    return (
        <LayoutAdminRoot activeMenu={'dashboard'} name={'Team Rawat Inap'} role={'Super Admin'}>
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
        </LayoutAdminRoot>
    );
}

export default DashboardRoot;
