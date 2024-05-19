import { Flex, VStack, Heading, Box, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Logo from '~/lib/components/Logo';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <Flex
      as="main"
      justify="center"
      // align={{ base: 'center' }}
      minHeight="100vh"
      pt={{ base: 8 }}
    >
      <NextSeo title="Forgot password" />
      <VStack
        bg="white"
        width={420}
        height="fit-content"
        paddingY={6}
        paddingX={4}
        mt={{ base: 2 }}
        mx={{ base: 2 }}
        boxShadow="0px 8px 24px rgba(2, 15, 49, 0.2)"
        rounded="base"
      >
        <Logo boxProps={{ mt: { base: 8, md: 4 } }} />
        <Box pb={4}>
          <Heading
            fontSize="1.5rem"
            py="0.5rem"
            fontWeight={700}
            textAlign="center"
          >
            Reset Password
          </Heading>
          <Text textAlign="center" fontSize="md" fontWeight="medium">
            Enter your email address below to get a password reset link in your
            email
          </Text>
        </Box>
        <Box width="full">
          <ForgotPasswordForm />
        </Box>
      </VStack>
    </Flex>
  );
};

export default ForgotPassword;
