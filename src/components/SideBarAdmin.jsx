import { Flex, Stack, Text, Divider } from '@chakra-ui/layout';
import { Image, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const SideBarAdmin = ({active}) => {
    return (
        <Stack
            listStyleType='none'
            pt='16'
            mr={{ base: '0', md: '10', lg: '14' }}
            ml='0'
        >
            <Link
                to='/admin/dashboard'
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={ active === 'dashboard' &&'#1FA8F642' }
                    borderLeft={active === 'dashboard' &&'4px'}
                    borderColor={active === 'dashboard' &&'#1FA8F6'}
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
                to='/admin/user'
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
                        src={active === 'user' ? '/src/assets/images/admin_active.svg' : '/src/assets/images/admin.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'user' && '#0EA7FF'}
                    >
                        Admin
                    </Text>
                </Flex>
            </Link>
            <Link
                to=''
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'room' && '#1FA8F642'}
                    borderColor={active === 'room' && '#1FA8F6'}
                    borderLeft={active === 'room' && '4px'}
                    gap='2'
                    alignItems='center'
                >
                    <Image 
                    src={active === 'room' ? '/src/assets/images/calendar_active.svg' : '/src/assets/images/calendar.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'room' && '#0EA7FF'}
                    >
                        Room
                    </Text>
                </Flex>
            </Link>
            <Link
                to=''
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'patient' && '#1FA8F642'}
                    borderLeft={active === 'patient' && '4px'}
                    borderColor={active === 'patient' && '#1FA8F6'}
                    gap='2'
                    alignItems='center'
                >
                    <Image 
                        src={active === 'patient' ? '/src/assets/images/patient_active.svg' : '/src/assets/images/patient.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'patient' && '#0EA7FF'}
                    >
                        Patient
                    </Text>
                </Flex>
            </Link>
            <Link
                to=''
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'doctor' && '#1FA8F642'}
                    borderLeft={active === 'doctor' && '4px'}
                    borderColor={active === 'doctor' && '#1FA8F6'}
                    gap='2'
                    alignItems='center'
                >
                    <Image src={active === 'doctor' ? '/src/assets/images/doctor_active.svg' : '/src/assets/images/doctor.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'doctor' && '#0EA7FF'}
                    >
                        Doctor
                    </Text>
                </Flex>
            </Link>
            <Link
                to=''
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
            <Divider
                borderColor='#CDD1E0'
            />
            <Link
                to='/admin/profile'
            >
                <Flex
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    bg={active === 'profile' && '#1FA8F642'}
                    borderLeft={active === 'profile' && '4px'}
                    borderColor={active === 'profile' && '#1FA8F6'}
                    gap='2'
                    alignItems='center'
                >
                    <Image 
                        src={active === 'profile' ? '/src/assets/images/update_profile_active.svg' : '/src/assets/images/update_profile.svg'}
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color={active === 'profile' && '#0EA7FF'}
                    >
                        Profil
                    </Text>
                </Flex>
            </Link>
        </Stack>
    );
}

export default SideBarAdmin;
