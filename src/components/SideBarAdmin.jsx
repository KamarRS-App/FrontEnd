import { Flex, Stack, Text, Divider, SimpleGrid } from "@chakra-ui/layout";
import { Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import dashboardActive from '../assets/images/dashboard_active.svg';
import dashboard from '../assets/images/dashboard.svg';
import hospitalActive from '../assets/images/hospital_active.svg';
import hospital from '../assets/images/hospital.svg';
import roomActive from '../assets/images/room-active.svg';
import room from "../assets/images/kamar-icon.svg";
import poliActive from "../assets/images/poliklinik-active.svg";
import poli from "../assets/images/patient.svg";
import adminActive from '../assets/images/admin_active.svg';
import admin from '../assets/images/admin.svg';
import practiceActive from "../assets/images/praktek-active.svg";
import practice from "../assets/images/praktek.svg";
import settingActive from "../assets/images/setting-active.svg";
import setting from "../assets/images/setting.svg";

const SideBarAdmin = ({ active }) => {
  return (
    <Stack
      listStyleType="none"
      pt="16"
      mr={{ base: "0", md: "10", lg: "14" }}
      ml="0"
    >
      <Link to="/admin/dashboard">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "dashboard" && "#1FA8F642"}
          borderLeft={active === "dashboard" && "4px"}
          borderColor={active === "dashboard" && "#1FA8F6"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={active === "dashboard" ? dashboardActive : dashboard}
            width={{ base: "24px", sm: "28px", md: "30px", lg: "32px" }}
            mr={3}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "dashboard" && "#0EA7FF"}
          >
            Dashboard
          </Text>
        </Flex>
      </Link>
      <Link to="/admin/room">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "room" && "#1FA8F642"}
          borderColor={active === "room" && "#1FA8F6"}
          borderLeft={active === "room" && "4px"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={active === "room" ? roomActive : room}
            width={{ base: "25px", sm: "32px", md: "35px", lg: "42px" }}
            mr={2}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "room" && "#0EA7FF"}
          >
            Kamar
          </Text>
        </Flex>
      </Link>
      <Link to="/admin/patient">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "patient" && "#1FA8F642"}
          borderLeft={active === "patient" && "4px"}
          borderColor={active === "patient" && "#1FA8F6"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={active === "patient" ? adminActive : admin}
            width={{ base: "25px", sm: "28px", md: "30px", lg: "32px" }}
            mr={4}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "patient" && "#0EA7FF"}
          >
            Pasien
          </Text>
        </Flex>
      </Link>
      <Link to="/admin/policlinic">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "poli" && "#1FA8F642"}
          borderLeft={active === "poli" && "4px"}
          borderColor={active === "poli" && "#1FA8F6"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={active === "poli" ? poliActive : poli}
            width={{ base: "25px", sm: "30px", md: "35px", lg: "40px" }}
            mr={2}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "poli" && "#0EA7FF"}
          >
            Poliklinik
          </Text>
        </Flex>
      </Link>
      <Link to="/admin/daily_praktek">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "praktek" && "#1FA8F642"}
          borderLeft={active === "praktek" && "4px"}
          borderColor={active === "praktek" && "#1FA8F6"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={ active === "praktek" ? practiceActive : practice }
            width={{ base: "25px", sm: "28px", md: "30px", lg: "32px" }}
            mr={2}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "praktek" && "#0EA7FF"}
          >
            Praktek
          </Text>
        </Flex>
      </Link>
      <Link to="/admin/hospital/profile">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "hospital" && "#1FA8F642"}
          borderLeft={active === "hospital" && "4px"}
          borderColor={active === "hospital" && "#1FA8F6"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={ active === "hospital" ? hospitalActive : hospital }
            width={{ base: "25px", sm: "30px", md: "35px", lg: "40px" }}
            mr={2}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "hospital" && "#0EA7FF"}
          >
            Rumah Sakit
          </Text>
        </Flex>
      </Link>
      <Divider borderColor="#CDD1E0" />
      <Link to="/admin/profile">
        <Flex
          px={{ base: "0", md: "0", lg: "14" }}
          pl={{ base: "0", md: "5" }}
          justify={{ base: "center", md: "normal" }}
          color="#CDD1E0"
          py={{ base: "1", md: "2", lg: "2" }}
          bg={active === "profile" && "#1FA8F642"}
          borderLeft={active === "profile" && "4px"}
          borderColor={active === "profile" && "#1FA8F6"}
          gap="2"
          alignItems="center"
        >
          <Image
            src={ active === "profile" ? settingActive : setting }
            width={{ base: "25px", sm: "30px", md: "34px", lg: "39px" }}
          />
          <Text
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            color={active === "profile" && "#0EA7FF"}
          >
            Setting
          </Text>
        </Flex>
      </Link>
    </Stack>
  );
};

export default SideBarAdmin;
