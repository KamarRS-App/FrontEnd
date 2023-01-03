import React, { useState } from 'react';
import { Box, Stack } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Image, Button, Flex, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuth, nameUser, isActive }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const toggle = () => SetIsOpen(!isOpen);
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10">
      <NavBarContainer>
        <Link to='/home'>
          <Image height="75px" width="100px" objectFit="contain" src="/src/assets/images/logo_rawat_inap.svg" alt="Logo Rawat Inap" />
        </Link>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} Auth={isAuth} nameUser={nameUser} isActive={isActive} onLoginHandler={() => navigate('/login')} />
      </NavBarContainer>
    </div>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

const MenuLinks = ({ isOpen, Auth, onLoginHandler, nameUser, isActive }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      bg={{ base: "white" }}
      borderRadius="20"
      py={{ base: "6" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
        color="#CDD1E0"
      >
        {Auth ? (
          <>
            <Link
              to="/home"
            >
              <Text
                color={isActive === 'home' && 'alta.primary'}
              >
                Beranda
              </Text>
            </Link>
            <Link
              to="/rumahsakit"
            >
              <Text
                color={isActive === 'hospital' && 'alta.primary'}
              >
                Cari Rumah Sakit
              </Text>
            </Link>
            <Link
              to="/dokter"
            >
              <Text
                color={isActive === 'doctor' && 'alta.primary'}
              >
                Cari Dokter
              </Text>
            </Link>
            <Menu>
              <MenuButton righticon={<ChevronDownIcon />}>
                <Flex align="center" gap="3">
                  <Avatar width="30px" height="30px">
                  </Avatar>
                  <Text
                    fontSize={{ base: "16px", md: "18px", lg: "18px" }}
                    color="#1FA8F6"
                  >
                    {nameUser}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Menu>
            <Link
              color="#3AB8FF"
              _hover={{ textDecoration: "none" }}
              href="/home"
            >
              Beranda
            </Link>
            {/* <Link color="#3AB8FF" _hover={{ textDecoration: 'none' }} href="/home">
              Cari Rumah Sakit
            </Link>
            <Link
              color="#3AB8FF"
              _hover={{ textDecoration: "none" }}
              href="/cari/dokter"
            >
              Cari Dokter
            </Link> */}
            <Button bg="#3AB8FF" _hover={{ bg: '#1FA8F6' }} color="white" onClick={onLoginHandler}>
              Login <ChevronRightIcon />
            </Button>
          </Menu>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={{ base: 0, md: 8 }}
      py={{ base: 0, md: 3 }}
      px={20}
      bg={{ base: "white", md: "white" }}
      {...props}
      height={{ base: "0", md: "auto" }}
    >
      {children}
    </Flex>
  );
};

export default Navbar;
