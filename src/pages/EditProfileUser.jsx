import React from "react";
import {
  Box,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function EditProfileUser() {
  const token = Cookies.get("token");
  const toast = useToast();
  const navigate = useNavigate();
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [noNik, setNoNik] = React.useState();
  const [noKK, setNoKK] = React.useState();
  const [noTelp, setNoTelp] = React.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //get detail user
  const getDetailUser = async () => {
    await api.getUser(token).then((response) => {
      setNama(response.data.data.nama);
      setNoNik(response.data.data.nik);
      setNoKK(response.data.data.no_kk);
      setEmail(response.data.data.email);
      setNoTelp(response.data.data.no_telpon);
    });
  };

  //rhf configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //submit changes
  const editUserHandler = async (data) => {
    await api
      .updateUser(token, data)
      .then((response) =>
        toast({
          title: `Berhasil mengubah data.`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 2000,
        })
      )
      .catch((err) =>
        toast({
          title: `Gagal mengubah data.`,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 2000,
        })
      );
  };

  //delete user
  const deleteUserHandler = async () => {
    await api
      .deleteUser(token)
      .then((response) => {
        toast({
          title: `Berhasil menghapus akun, mengalihkan ke halaman login`,
          status: "success",
          position: "top",
          isClosable: true,
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) =>
        toast({
          title: `Gagal menghapus akun`,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 2000,
        })
      );
  };

  const onSubmit = (data) => {
    editUserHandler(data);
  };

  React.useEffect(() => {
    getDetailUser();
  }, []);

  return (
    <Layout>
      <Box w="full" h="full" color="black">
        <Box w="full">
          <Box p="20">
            <Box textAlign={"end"} mb={10}>
              <Button
                backgroundColor={"#3AB8FF"}
                color={"white"}
                _hover={{ backgroundColor: "alta.primary" }}
                onClick={onOpen}
              >
                Hapus Akun ✖
              </Button>
              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Hapus Akun</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                      Apakah anda yakin untuk menghapus akun? Akun yang sudah
                      dihapus tidak dapat dikembalikan lagi.
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => deleteUserHandler()} mr={2}>
                      Hapus
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
              gap={10}
            >
              <GridItem>
                <FormControl isInvalid={errors.nama}>
                  <FormLabel>Nama:</FormLabel>
                  <Input
                    {...register("nama")}
                    type={"text"}
                    name={"nama"}
                    defaultValue={nama}
                  />
                  <Text color={"red"}>{errors.nama?.message}</Text>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...register("email")}
                    type={"text"}
                    name={"email"}
                    defaultValue={email}
                  />
                  <Text color={"red"}>{errors.email?.message}</Text>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.no_nik}>
                  <FormLabel>Nomor Induk Kependudukan</FormLabel>
                  <Input
                    {...register("no_nik")}
                    type={"text"}
                    name={"no_nik"}
                    defaultValue={noNik}
                  />
                  <Text color={"red"}>{errors.no_nik?.message}</Text>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.no_kk}>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <Input
                    {...register("no_kk")}
                    type={"number"}
                    name={"no_kk"}
                    defaultValue={noKK}
                  />
                  <Text color={"red"}>{errors.no_kk?.message}</Text>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.kata_sandi}>
                  <FormLabel>Kata Sandi</FormLabel>
                  <Input
                    {...register("kata_sandi")}
                    type={"text"}
                    name={"kata_sandi"}
                  />
                  <Text color={"red"}>{errors.kata_sandi?.message}</Text>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.no_telpon}>
                  <FormLabel>Nomor Telpon</FormLabel>
                  <Input
                    {...register("no_telpon")}
                    type={"text"}
                    name={"no_telpon"}
                    defaultValue={noTelp}
                  />
                  <Text color={"red"}>{errors.no_telpon?.message}</Text>
                </FormControl>
              </GridItem>
            </Grid>
            <Box mt={9}>
              <Button
                bg="#3AB8FF"
                color="white"
                _hover={{ bg: "alta.primary" }}
                onClick={handleSubmit(onSubmit)}
              >
                Ubah Data
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default EditProfileUser;
