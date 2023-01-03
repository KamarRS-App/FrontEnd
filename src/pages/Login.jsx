import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import googleLogo from "../assets/images/googlelogo.png";
import api from "../services/api";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
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
  FormControl,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addUsers } from "../features/userSlice";

function Login() {
  const [show, setShow] = useState(false);
  const showPassword = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  const [passwordType, setPasswordType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const onShowPassword = (e) => {
    setPasswordType(e.target.value);
  };

  //yup schema
  const schema = yup.object().shape({
    email: yup.string().email("Format email salah"),
    kata_sandi: yup.string(),
  });

  //rhf configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  //checkbox handler
  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    console.log(e.target.checked);
  };

  //handle login
  const handleLogin = async (email, password) => {
    await api
      .loginUser(email, password)
      .then((response) => {
        const data = response.data.data;
        toast({
          title: `Sukses login, mengalihkan...`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
        getUser(data.token);
        Cookies.set("token", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        toast({
          title: `Login gagal, silahkan coba lagi.`,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 1500,
        });
        console.log(error);
      });
  };

  const getUser = async (token) => {
    await api
      .getUser(token)
      .then((response) => {
        const data = response.data.data;
        dispatch(addUsers(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //submit function
  const onSubmit = (data) => {
    handleLogin(email, password);
    if (isChecked === true) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("isChecked", isChecked);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("isChecked");
    }
  };

  React.useEffect(() => {
    if (localStorage.email) {
      setEmail(localStorage.email);
      setPassword(localStorage.password);
      setIsChecked(localStorage.isChecked);
    }

    if (token) {
      toast({
        position: "top",
        title: "Kamu sudah Login",
        status: "warning",
        duration: "2000",
        isClosable: true,
      });
      navigate("/home");
    }
  }, []);

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
                  <FormControl isInvalid={errors.email}>
                    <Input
                      // {...register("email")}
                      placeholder="email@gmail.com"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Text color="red">{errors.email?.message}</Text>
                  </FormControl>
                  <br />
                  <label for="password" className="text-slate-500">
                    Password:
                  </label>{" "}
                  <br />
                  <FormControl isInvalid={errors.kata_sandi}>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        // {...register("kata_sandi")}
                        placeholder="kata sandi"
                        name="kata_sandi"
                        id="password"
                        onInput={onShowPassword}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordType !== "" && (
                        <InputRightElement>
                          {show ? (
                            <ViewOffIcon
                              onClick={showPassword}
                              cursor={"pointer"}
                            />
                          ) : (
                            <ViewIcon
                              onClick={showPassword}
                              cursor={"pointer"}
                            />
                          )}
                        </InputRightElement>
                      )}
                    </InputGroup>
                    <Text color="red">{errors.kata_sandi?.message}</Text>
                  </FormControl>
                  <Box className="flex flex-row mt-5 justify-between">
                    <Box>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        className="checkbox checkbox-xs mr-2 border-gray-500"
                        id={"isChecked"}
                        onChange={(e) => handleCheckbox(e)}
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
                  <Link
                    color="alta.primary"
                    href="#"
                    fontWeight="semibold"
                    onClick={() => navigate("/register")}
                  >
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
