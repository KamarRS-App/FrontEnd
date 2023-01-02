import React from "react";
import {
  Box,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  GridItem,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";

function EditProfileUser() {
  const token = Cookies.get("token");
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [noNik, setNoNik] = React.useState();
  const [noKK, setNoKK] = React.useState();
  const [kataSandi, setKataSandi] = React.useState("");
  const [noTelp, setNoTelp] = React.useState();

  //schema
  const schema = yup.object().shape({
    nama: yup.string().required("Harap masukkan nama"),
    email: yup
      .string()
      .required("Harap masukkan email")
      .email("Format email salah"),
    no_nik: yup.number().typeError("Harap masukkan Nomor Induk Kependudukan"),
    no_kk: yup.number().typeError("Harap masukkan nomor Kartu Keluarga"),
    kata_sandi: yup.string().required("Harap masukkan kata sandi"),
    no_telpon: yup.number().typeError("Harap masukkan nomor telpon"),
  });

  //get detail user
  const getDetailUser = async () => {
    await api
      .getUser(token)
      .then((response) => {
        console.log(response);
        setNama(response.data.data.nama);
        setNoNik(response.data.data.nik);
        setNoKK(response.data.data.no_kk);
        setEmail(response.data.data.email);
        setNoTelp(response.data.data.no_telpon);
      })
      .catch((err) => console.log(err));
  };

  //rhf configuration
  const {
    register,
    handeSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  React.useEffect(() => {
    getDetailUser();
  }, []);

  return (
    <Layout>
      <Box w="full" h="full" color="black">
        <Box w="full">
          <Box p="20">
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
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default EditProfileUser;
