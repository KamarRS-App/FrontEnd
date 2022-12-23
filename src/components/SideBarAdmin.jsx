import { Link, Flex, Stack, Text, Divider } from '@chakra-ui/layout';
import { Image, Box } from '@chakra-ui/react';
import React from 'react';

const SideBarAdmin = () => {
    return (
        <Stack
            listStyleType='none'
            pt='16'
            mr={{ base: '0', md: '10', lg: '14' }}
            ml='0'
        >
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    borderLeft='4px'
                    borderColor='#1FA8F6'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/dashboard_active.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                        color='#0EA7FF'
                    >
                        Dashboard
                    </Text>
                </Flex>
            </Link>
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    // bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    // borderLeft='4px'
                    // borderColor='#1FA8F6'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/admin.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                    >
                        Admin
                    </Text>
                </Flex>
            </Link>
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    // bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    // borderLeft='4px'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/calendar.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                    >
                        Room
                    </Text>
                </Flex>
            </Link>
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    // bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    // borderLeft='4px'
                    // borderColor='#1FA8F6'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/patient.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                    >
                        Patient
                    </Text>
                </Flex>
            </Link>
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    // bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    // borderLeft='4px'
                    // borderColor='#1FA8F6'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/doctor.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                    >
                        Doctor
                    </Text>
                </Flex>
            </Link>
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    // bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    // borderLeft='4px'
                    borderColor='#1FA8F6'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/hospital.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                    >
                        Rumah Sakit
                    </Text>
                </Flex>
            </Link>
            <Divider
                borderColor='#CDD1E0'
            />
            <Link
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    // bg='#1FA8F642'
                    px={{ base: '0', md: '0', lg: '14' }}
                    pl={{ base: '0', md: '5' }}
                    justify={{ base: 'center', md: 'normal' }}
                    color='#CDD1E0'
                    py={{ base: '1', md: '2', lg: '2' }}
                    // borderLeft='4px'
                    borderColor='#1FA8F6'
                    gap='2'
                    alignItems='center'
                >
                    <Image src='/src/assets/images/update_profile.svg'
                        width={{ base: '25px', sm: '30px', md: '35px', lg: '40px' }}
                    />
                    <Text
                        display={{ base: 'none', sm: 'none', md: 'block', lg: 'block' }}
                    >
                        Profil
                    </Text>
                </Flex>
            </Link>
        </Stack>
    );
}

export default SideBarAdmin;
