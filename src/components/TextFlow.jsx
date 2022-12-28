import React from 'react';
import { Avatar, Box, Card, CardBody, Text, Center } from '@chakra-ui/react';
function TextFlow() {
  const TextFlow = ({ heading, text }) => {
    return (
      <Box>
        <Card shadow="lg" align="center" height="250px" py="5" width="360px" borderRadius="xl">
          <CardBody>
            <Box width={['300px']} mx="auto">
              <Text align="center" pt={2} color="white" fontWeight="500" fontSize="24px">
                {heading}
              </Text>

              <Text align="start" fontSize="14px" m={4}>
                {text}
              </Text>
            </Box>
          </CardBody>
        </Card>
      </Box>
    );
  };
}

export default TextFlow;
