import { Image } from '@chakra-ui/image';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBarAdminRoot = ({active}) => {
    return (
        <Stack
            listStyleType='none'
            pt='16'
            mr={{ base: '0', md: '10', lg: '14' }}
            ml='0'
        >
            <Link
                to='/root/dashboard'
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'dashboard' && '#1FA8F642'}
                    borderLeft={active === 'dashboard' && '4px'}
                    borderColor={active === 'dashboard' && '#1FA8F6'}
                    gap='2'
                    alignItems='center'
                >
                    <Image src={active === 'dashboard' ? '/src/assets/images/dashboard_active.svg' : '/src/assets/images/dashboard.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'dashboard' && '#0EA7FF'}
                    >
                        Dashboard
                    </Text>
                </Flex>
            </Link>
            <Link
                to='/root/hospital'
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'hospital' && '#1FA8F642'}
                    borderLeft={active === 'hospital' && '4px'}
                    borderColor={active === 'hospital' && '#1FA8F6'}
                    gap='2'
                    alignItems='center'
                >
                    <Image
                        src={active === 'hospital' ? '/src/assets/images/hospital_active.svg' : '/src/assets/images/hospital.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'hospital' && '#0EA7FF'}
                    >
                        Rumah Sakit
                    </Text>
                </Flex>
            </Link>
        </Stack>
    );
}

export default SideBarAdminRoot;
