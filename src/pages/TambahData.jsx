import React from "react";
import { Button, Grid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Group3601 from "../assets/images/Group3601.png";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function TambahData() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box minH="100vh" backgroundColor="white">
        <Box px={36} py={20} w="100%">
          <Box className="text-end">
            <Button
              bg="#3AB8FF"
              _hover={{ bg: "alta.primary" }}
              color="white"
              onClick={() => navigate("/pasien/tambah")}
            >
              Tambah data +
            </Button>
          </Box>
          <Box pt={20} className="text-center">
            <Text color="gray" fontSize="3xl">
              belum ada data terdaftar
            </Text>
            <Box pt={10}>
              <Grid className="justify-center">
                <Image src={Group3601} alt="Belum ada data" />
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default TambahData;
