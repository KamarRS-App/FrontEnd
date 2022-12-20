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

function Login() {
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
                  <label for="fname" className="text-slate-500">
                    Email:
                  </label>{" "}
                  <br />
                  <Input placeholder="email@gmail.com" mb="5" />
                  <br />
                  <label for="password" className="text-slate-500">
                    Password:
                  </label>{" "}
                  <br />
                  <Input placeholder="password" />
                </form>
              </div>
            </div>
            <div className="flex flex-row mt-5 justify-between">
              <div>
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs mr-2 border-gray-500"
                />
                <label for="rememberme">Remember me</label>
              </div>
              <Link color="red">Lupa Password</Link>
            </div>
            <Button
              color="white"
              width="100%"
              mt="10"
              backgroundColor="alta.primary"
            >
              Login
            </Button>
            <Flex align="center" mt="20">
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
                    <Text fontSize="md">Login with Google</Text>
                  </Box>
                </Flex>
              </Button>
            </div>
            <Box>
              <Center>
                <Text mt="10">
                  Dont have an account?{" "}
                  <Link color="alta.primary" href="#" fontWeight="semibold">
                    Sign up
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

export default Login;
