import React from "react";
import logo from "../assets/images/logo.png";
import googleLogo from "../assets/images/googlelogo.png";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
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
  useToast,
  FormControl,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Register() {
  const [show, setShow] = React.useState(false);
  const showPassword = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = React.useState("");

  const onShowPassword = (e) => {
    setPasswordType(e.target.value);
  };

  //yup schema
  const schema = yup.object({
    nama: yup.string().required("Harap masukkan username"),
    email: yup
      .string()
      .required("Harap masukkan email")
      .email("Format email salah"),
    // no_telpon: yup
    //   .number("Nomor telpon haruslah angka")
    //   .required("Harap masukkan nomor telpon"),
    kata_sandi: yup
      .string()
      .required("Harap masukkan password")
      .min(8, "Password setidaknya 8 karakter"),
    nik: yup.number().typeError("Harap masukkan NIK").required(),
    no_kk: yup
      .number()
      .typeError("Harap masukkan Nomor Kartu Keluarga")
      .required(),
  });

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  //handle register
  const handleRegister = async (data) => {
    await api
      .registerData(data)
      .then((response) => {
        toast({
          title: `Sukses membuat akun.`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((err) => {
        if (
          (err.response.data.message =
            "erorr: Gagal membuat akun, Email sudah terdaftar")
        ) {
          toast({
            title: `Email sudah terdaftar`,
            status: "error",
            position: "top",
            isClosable: true,
            duration: 1500,
          });
        } else {
          toast({
            title: `Gagal membuat akun`,
            status: "error",
            position: "top",
            isClosable: true,
            duration: 1500,
          });
        }
      });
  };

  //submit data
  const onSubmit = (data) => {
    handleRegister(data);
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
            pb={{ base: "16" }}
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
              >
                Save Life
              </Text>
            </Box>
            <Box className="flex flex-col">
              <Box className="text-start w-full">
                <FormControl isInvalid={errors.nama}>
                  <Input
                    {...register("nama")}
                    placeholder="Masukkan username"
                    type={"text"}
                    name="nama"
                  />
                  <Text color={"red"}>{errors.nama?.message}</Text>
                </FormControl>
                <FormControl mt={3} isInvalid={errors.email}>
                  <Input
                    {...register("email")}
                    placeholder="Masukkan email"
                    type={"email"}
                    name={"email"}
                  />
                  <Text color={"red"}>{errors.email?.message}</Text>
                </FormControl>
                <FormControl mt={3} isInvalid={errors.nik}>
                  <Input
                    {...register("nik")}
                    type={"number"}
                    name={"nik"}
                    placeholder="Masukkan NIK"
                  />
                  <Text color={"red"}>{errors.nik?.message}</Text>
                </FormControl>
                <FormControl mt={3} isInvalid={errors.no_kk}>
                  <Input
                    {...register("no_kk")}
                    name="no_kk"
                    type={"number"}
                    placeholder="Masukkan No. Kartu Keluarga"
                  />
                  <Text color={"red"}>{errors.no_kk?.message}</Text>
                </FormControl>
                <FormControl mt={3} isInvalid={errors.no_telpon}>
                  <Input
                    {...register("nomorHape")}
                    type="number"
                    placeholder="Masukkan nomor hp"
                    name="nomorHape"
                  />
                  <Text color="red">{errors.no_telpon?.message}</Text>
                </FormControl>
                <FormControl mt={3} isInvalid={errors.kata_sandi}>
                  <InputGroup>
                    <Input
                      // {...register("kata_sandi")}
                      {...register("kata_sandi")}
                      type={show ? "text" : "password"}
                      placeholder="Masukkan password"
                      name="kata_sandi"
                      onInput={onShowPassword}
                    />
                    {passwordType && (
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
                    )}
                  </InputGroup>
                </FormControl>
                <Text color={"red"}>{errors.kata_sandi?.message}</Text>
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
                  <Link
                    color="alta.primary"
                    href="#"
                    fontWeight="semibold"
                    onClick={() => navigate("/")}
                  >
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
