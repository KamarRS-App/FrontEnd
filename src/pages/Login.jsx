import React, { useState } from "react";
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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Harap masukkan email")
    .email("Format email salah"),
  password: yup
    .string()
    .required("Harap masukkan password")
    .min(8, "Password setidaknya harus 8 karakter")
    .max(32, "Password maksimal 32 karakter"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Box minH={"100%"}>
      <Box>
        <Box
          py={{ base: "10" }}
          pl={{ base: "1", md: "16" }}
          bg={{ base: "transparent", md: "white" }}
          position={{ base: "absolute", md: "relative" }}
          zIndex="2"
        >
          <Image src={logo} width={150} />
        </Box>
        <Flex
          height={{ base: "auto", md: "auto", lg: "full" }}
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Flex
            height={{
              base: "600px",
              sm: "600px",
              md: "600px",
              lg: "700px",
              xl: "700px",
            }}
            width="full"
            backgroundImage="url(/src/assets/images/home-room.jpg)"
            backgroundSize={{
              base: "cover",
              sm: "cover",
              md: "cover",
              lg: "contain",
            }}
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            justifyContent="center"
            alignItems="center"
            mr={{ base: "0", md: "20" }}
          >
            <Box
              display={{ base: "block", md: "none" }}
              width="250px"
              zIndex="3"
            >
              <Text
                fontSize="5xl"
                fontWeight="semibold"
                color="alta.primary"
                width="100%"
                align="center"
              >
                Find Room, Save Life
              </Text>
              <Text fontSize="18px" color="black">
                Informasi kamar Rumah Sakit secara real-time bagi anda dan
                keluarga
              </Text>
            </Box>
          </Flex>
          <Box
            bg={"#FFFFFFAD"}
            height="600px"
            position="absolute"
            zIndex="1"
            top="0"
            width="full"
            display={{ base: "block", md: "none" }}
          ></Box>
          <Box
            mx={{ base: "auto", lg: "0" }}
            width={{ base: "350px", sm: "500px", md: "700px", lg: "700px" }}
            px={{ base: "10", lg: "24" }}
            py={{ base: "16" }}
          >
            <Box
              textAlign="center"
              display={{ base: "none", sm: "none", md: "block" }}
            >
              <Text
                fontSize={{ md: "4xl", lg: "5xl" }}
                fontWeight="semibold"
                color="alta.primary"
              >
                Find Room,
              </Text>
              <Text
                fontSize={{ md: "4xl", lg: "5xl" }}
                fontWeight="semibold"
                color="alta.primary"
                mb="5"
              >
                Save Life
              </Text>
            </Box>
            <Box className="flex flex-col">
              <Box className="text-start w-full">
                <form>
                  <label for="fname" className="text-slate-500">
                    Email:
                  </label>{" "}
                  <br />
                  <Input
                    {...register("email")}
                    placeholder="email@gmail.com"
                    name="email"
                  />
                  <Text color="red">{errors.email?.message}</Text>
                  <br />
                  <label for="password" className="text-slate-500">
                    Password:
                  </label>{" "}
                  <br />
                  <Input
                    {...register("password")}
                    placeholder="password"
                    name="password"
                  />
                  <Text color="red">{errors.password?.message}</Text>
                  <Box className="flex flex-row mt-5 justify-between">
                    <Box>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs mr-2 border-gray-500"
                      />
                      <label for="rememberme">Remember me</label>
                    </Box>
                    <Link color="red">Lupa Password</Link>
                  </Box>
                  <Button
                    color="white"
                    width="100%"
                    mt="10"
                    backgroundColor="alta.primary"
                    _hover={{ bg: "#3AB8FF" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </Box>
            <Flex align="center" mt="10">
              <Divider />
              <Text width="100%" align="center">
                Or with
              </Text>
              <Divider />
            </Flex>
            <Box mt={10}>
              <Button
                colorScheme="white"
                color="#000000"
                variant="solid"
                border="1px"
                borderColor="#00000066"
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
            </Box>
            <Box>
              <Center>
                <Text mt="5">
                  Dont have an account?{" "}
                  <Link color="alta.primary" href="#" fontWeight="semibold">
                    Sign up
                  </Link>
                </Text>
              </Center>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Login;
