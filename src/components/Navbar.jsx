import React, { useState } from "react";
import { Box, Stack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import {
  Image,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  CloseIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const Navbar = ({ isAuth }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const toggle = () => SetIsOpen(!isOpen);
  return (
    <div className="sticky top-0 z-10">
      <NavBarContainer>
        <Image
          height="75px"
          width="100px"
          objectFit="contain"
          src="/src/assets/images/logo_rawat_inap.svg"
          alt="Logo Rawat Inap"
        />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} Auth={isAuth} />
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

const MenuLinks = ({ isOpen, Auth }) => {
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
            <Link _hover={{ textDecoration: "none" }} to="/home">
              Beranda
            </Link>
            <Link _hover={{ textDecoration: "none" }} to="/how">
              Cari Rumah Sakit
            </Link>
            <Link _hover={{ textDecoration: "none" }} to="/faetures">
              Cari Dokter
            </Link>
            <Menu>
              <MenuButton rightIcon={<ChevronDownIcon />}>
                <Flex align="center" gap="3">
                  <Avatar width="30px" height="30px">
                    Al
                  </Avatar>
                  <Text
                    fontSize={{ base: "16px", md: "18px", lg: "24px" }}
                    color="#1FA8F6"
                  >
                    Almira
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
            <Link
              color="#3AB8FF"
              _hover={{ textDecoration: "none" }}
              href="/home"
            >
              Cari Rumah Sakit
            </Link>
            <Link
              color="#3AB8FF"
              _hover={{ textDecoration: "none" }}
              href="/cari/dokter"
            >
              Cari Dokter
            </Link>
            <Button bg="#3AB8FF" _hover={{ bg: "#1FA8F6" }} color="white">
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
