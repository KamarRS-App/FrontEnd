import React from 'react';
import { Avatar, Box, Card, CardBody, Text, Center } from '@chakra-ui/react';

const CardFlow = ({ desc, number }) => {
  return (
    <Card shadow="lg" align="center" height="250px" py="5" width="360px" borderRadius="xl">
      <CardBody>
        <Box width={['300px']} mx="auto">
          <Box width="57px" height="57px" position="relative" bg="alta.primary" mx="auto" borderRadius="full">
            {' '}
            <Text align="center" pt={2} color="white" fontWeight="500" fontSize="24px">
              {number}
            </Text>
          </Box>

          <Text align="center" fontSize="16px" m={5}>
            {desc}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CardFlow;
