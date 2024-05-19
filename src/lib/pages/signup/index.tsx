import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Logo from '~/lib/components/Logo';

import SignupForm from './SignupForm';

const SignUp = () => {
  return (
    <Flex as="main" justify="center" align="center">
      <NextSeo title="Signup" />
      <VStack
        bg="white"
        width={420}
        height="fit-content"
        p={6}
        my={{ base: 2, md: 10 }}
        boxShadow="0px 8px 24px rgba(2, 15, 49, 0.2)"
        rounded="base"
        mx={{ base: 2 }}
      >
        <Logo boxProps={{ mt: { base: 8, md: 4 } }} />
        <Box>
          <Heading
            fontSize="24px"
            py="0.5rem"
            fontWeight="medium"
            textAlign="center"
          >
            Create an Account
          </Heading>
          <Text textAlign="center" fontSize="16px" mb={4}>
            Say hello to zero downtime. Keep track of all the third-party
            software your product uses in one dashboard and get notified about
            outages.
          </Text>
        </Box>
        <SignupForm />
      </VStack>
    </Flex>
  );
};

export default SignUp;
