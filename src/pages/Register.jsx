import React from "react";
import logo from "../assets/images/logo.png";
import roomImage from "../assets/images/room.png";
import googleLogo from "../assets/images/googlelogo.png";
import { Button, Center } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

function Register() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div>
        <div className="pt-10 pl-20">
          <img src={logo} width={150} />
        </div>
        <div className="flex flex-row mt-20 h-[700px]">
          <div
            className="basis-1/2 h-full"
            style={{
              backgroundImage: `url(${roomImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="basis-1/2 px-36">
            <div className="text-center">
              <Text fontSize="5xl" fontWeight="semibold" color="alta.primary">
                Find Room,{" "}
              </Text>
              <Text
                fontSize="5xl"
                fontWeight="semibold"
                color="alta.primary"
                mb="5"
              >
                Save Life
              </Text>
            </div>
            <div className="flex flex-col">
              <div className="text-start w-full">
                <form>
                  <Input placeholder="Masukkan username" mb="5" />
                  <br />
                  <Input placeholder="Masukkan email" mb="5" />
                  <br />
                  <Input placeholder="Masukkan nomor hp" mb="5" />
                  <br />
                  <Input placeholder="Masukkan password" />
                </form>
              </div>
            </div>
            <Button
              color="white"
              width="100%"
              mt="10"
              backgroundColor="alta.primary"
            >
              Sign Up
            </Button>
            <Flex align="center" mt="8">
              <Divider />
              <Text width="100%" align="center">
                Or with
              </Text>
              <Divider />
            </Flex>
            <div className="mt-5">
              <Button
                colorScheme="white"
                color="#000000"
                variant="solid"
                border="2px"
                width="100%"
              >
                <Flex minWidth="max-content" gap="2" w="100%">
                  <Box>
                    <Image src={googleLogo} boxSize="20px" />
                  </Box>
                  <Spacer />
                  <Box flex="100%">
                    <Text fontSize="md">Signup with Google</Text>
                  </Box>
                </Flex>
              </Button>
            </div>
            <Box>
              <Center>
                <Text mt="10">
                  Already have an account?{" "}
                  <Link color="alta.primary" href="#" fontWeight="semibold">
                    Login
                  </Link>
                </Text>
              </Center>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
