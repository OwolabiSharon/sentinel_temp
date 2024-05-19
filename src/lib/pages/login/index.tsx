import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Logo from '~/lib/components/Logo';

import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Flex
      as="main"
      justify="center"
      align={{ base: 'center' }}
      minHeight="100vh"
    >
      <NextSeo title="Login" />
      <VStack
        bg="white"
        width={420}
        height="fit-content"
        p={6}
        mt={{ base: 2 }}
        mx={{ base: 2 }}
        boxShadow="0px 8px 24px rgba(2, 15, 49, 0.2)"
        rounded="base"
      >
        <Logo boxProps={{ mt: { base: 8, md: 4 } }} />
        <Box>
          <Heading
            fontSize="24px"
            py="0.5rem"
            fontWeight={700}
            textAlign="center"
          >
            Log in
          </Heading>
          <Text textAlign="center" fontSize="md" fontWeight="medium">
            Welcome back!
          </Text>
        </Box>
        <LoginForm />
      </VStack>
    </Flex>
  );
};

export default Login;
