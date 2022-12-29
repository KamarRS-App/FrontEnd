import React from "react";
import logo from "../assets/images/logo.png";
import googleLogo from "../assets/images/googlelogo.png";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Input,
  Link,
  Text,
  Divider,
  Flex,
  Spacer,
  Image,
  Box,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  username: yup.string().required("Harap masukkan username"),
  email: yup
    .string()
    .required("Harap masukkan email")
    .email("Format email salah"),
  nomorhape: yup.number().typeError("Harap masukkan nomor hp").required(),
  password: yup
    .string()
    .required("Harap masukkan password")
    .min(8, "Password setidaknya 8 karakter"),
});

function Register() {
  const [show, setShow] = React.useState(false);
  const showPassword = () => setShow(!show);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

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
                Find Room,{" "}
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
                  <Input
                    {...register("username")}
                    placeholder="Masukkan username"
                    name="username"
                  />
                  <Text color={"red"}>{errors.username?.message}</Text>
                  <br />
                  <Input {...register("email")} placeholder="Masukkan email" />
                  <Text color={"red"}>{errors.email?.message}</Text>
                  <br />
                  <Input
                    type="number"
                    {...register("nomorhape")}
                    placeholder="Masukkan nomor hp"
                  />
                  <Text color="red">{errors.nomorhape?.message}</Text>
                  <br />
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      {...register("password")}
                      placeholder="Masukkan password"
                    />
                    <InputRightElement>
                      {show ? (
                        <ViewOffIcon
                          onClick={showPassword}
                          cursor={"pointer"}
                        />
                      ) : (
                        <ViewIcon onClick={showPassword} cursor={"pointer"} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <Text color={"red"}>{errors.password?.message}</Text>
                  <Button
                    color="white"
                    width="100%"
                    mt="10"
                    backgroundColor="alta.primary"
                    _hover={{ bg: "#3AB8FF" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign Up
                  </Button>
                </form>
              </Box>
            </Box>
            <Flex align="center" mt="8">
              <Divider />
              <Text width="100%" align="center">
                Or with
              </Text>
              <Divider />
            </Flex>
            <Box mt={5}>
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
            </Box>
            <Box>
              <Center>
                <Text mt="5">
                  Already have an account?{" "}
                  <Link color="alta.primary" href="#" fontWeight="semibold">
                    Login
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

export default Register;
