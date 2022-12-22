import React from "react";
import { Button, Grid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Group3601 from "../assets/images/Group3601.png";

function TambahData() {
  return (
    <Box minH="100vh" backgroundColor="white">
      <Box p={36} w="100%">
        <Box className="text-end">
          <Button backgroundColor="alta.primary" color="white">
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
  );
}

export default TambahData;
