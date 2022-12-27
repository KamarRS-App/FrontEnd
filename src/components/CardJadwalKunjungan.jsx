import React, { useState } from 'react';
import { Center, Container, Grid, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { Box, Image, Heading, CardHeader, CardBody, CardFooter, Button, Link, Stack, StackDivider, Text, Card, Flex, IconButton } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { MdBuild, MdArrowBack } from 'react-icons/md';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
function CardJadwalKunjungan() {
  let navigate = useNavigate();
  return (
    <Box>
      {' '}
      <Card w={300}>
        <Box>
          <Text color="#072051" fontSize={15} fontWeight={500} m={7}>
            Pilih Jadwal Kunjungan
          </Text>
        </Box>
        <Stack spacing={2} direction="row" align="end" mx={5} mb={10}>
          <Button colorScheme="blue" width={60} height="60px" variant="outline" borderColor="#CDD1E0">
            <SimpleGrid rows={2}>
              <Heading color="#072051" fontSize={14} fontWeight={600}>
                Senin
              </Heading>
              <Text color="#828282" fontSize={12} fontWeight={400}>
                2 Jan
              </Text>
            </SimpleGrid>
          </Button>
          <Button colorScheme="blue" width={60} height="60px" variant="outline" borderColor="#CDD1E0">
            <SimpleGrid rows={2}>
              <Heading color="#072051" fontSize={14} fontWeight={600}>
                Senin
              </Heading>
              <Text color="#828282" fontSize={12} fontWeight={400}>
                2 Jan
              </Text>
            </SimpleGrid>
          </Button>
          <Button colorScheme="blue" width={60} height="60px" variant="outline" borderColor="#CDD1E0">
            <SimpleGrid rows={2}>
              <Heading color="#072051" fontSize={14} fontWeight={600}>
                Senin
              </Heading>
              <Text color="#828282" fontSize={12} fontWeight={400}>
                2 Jan
              </Text>
            </SimpleGrid>
          </Button>

          <IconButton width="60px" height="60px" colorScheme="blue" aria-label="Search database" icon={<SearchIcon />} />
        </Stack>

        <Accordion>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Pagi
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={4} direction="row" align="center" mx={10} mb={4}>
                <Button colorScheme="blue" height="28px" variant="outline" borderColor="#CDD1E0" borderRadius="19px">
                  <SimpleGrid rows={2}>
                    <Text color="#828282" fontSize={13} fontWeight={400}>
                      07.00
                    </Text>
                  </SimpleGrid>
                </Button>
                <Button colorScheme="blue" height="28px" variant="outline" borderColor="#CDD1E0" borderRadius="19px">
                  <SimpleGrid rows={2}>
                    <Text color="#828282" fontSize={13} fontWeight={400}>
                      08.00
                    </Text>
                  </SimpleGrid>
                </Button>
                <Button colorScheme="blue" height="28px" variant="outline" borderColor="#CDD1E0" borderRadius="19px">
                  <SimpleGrid rows={2}>
                    <Text color="#828282" fontSize={13} fontWeight={400}>
                      09.00
                    </Text>
                  </SimpleGrid>
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Sore
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={4} direction="row" align="center" mx={10} mb={4}>
                <Button colorScheme="blue" height="28px" variant="outline" borderColor="#CDD1E0" borderRadius="19px">
                  <SimpleGrid rows={2}>
                    <Text color="#828282" fontSize={13} fontWeight={400}>
                      15.00
                    </Text>
                  </SimpleGrid>
                </Button>
                <Button colorScheme="blue" height="28px" variant="outline" borderColor="#CDD1E0" borderRadius="19px">
                  <SimpleGrid rows={2}>
                    <Text color="#828282" fontSize={13} fontWeight={400}>
                      16.00
                    </Text>
                  </SimpleGrid>
                </Button>
                <Button colorScheme="blue" height="28px" variant="outline" borderColor="#CDD1E0" borderRadius="19px">
                  <SimpleGrid rows={2}>
                    <Text color="#828282" fontSize={13} fontWeight={400}>
                      17.00
                    </Text>
                  </SimpleGrid>
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button>Buat Janji</Button>
      </Card>
    </Box>
  );
}

export default CardJadwalKunjungan;
