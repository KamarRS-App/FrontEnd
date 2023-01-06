import { Image } from '@chakra-ui/image';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import dashboardActive from '../assets/images/dashboard_active.svg';
import dashboard from '../assets/images/dashboard.svg';
import hospitalActive from '../assets/images/hospital_active.svg';
import hospital from '../assets/images/hospital.svg';
import adminActive from '../assets/images/admin_active.svg';
import admin from '../assets/images/admin.svg';

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
                    <Image src={active === 'dashboard' ? dashboardActive : dashboard}
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
                        src={active === 'hospital' ? hospitalActive : hospital}
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
            <Link
                to='/root/user'
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'user' && '#1FA8F642'}
                    borderLeft={active === 'user' && '4px'}
                    borderColor={active === 'user' && '#1FA8F6'}
                    gap='2'
                    alignItems='center'
                >
                    <Image 
                        src={active === 'user' ? adminActive : admin}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'user' && '#0EA7FF'}
                    >
                        User Admin
                    </Text>
                </Flex>
            </Link>
        </Stack>
    );
}

export default SideBarAdminRoot;
