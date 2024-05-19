import { Flex, VStack, Heading, Box, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Logo from '~/lib/components/Logo';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  return (
    <Flex
      as="main"
      justify="center"
      // align={{ base: 'center' }}
      minHeight="100vh"
      pt={{ base: 8 }}
    >
      <NextSeo title="Reset password" />
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
        <Box pb={5}>
          <Heading
            fontSize="1.5rem"
            py="0.5rem"
            fontWeight={700}
            textAlign="center"
          >
            Set New Password
          </Heading>
          <Text textAlign="center" fontSize="md" fontWeight="medium">
            Set a new password for your Sentinel account.
          </Text>
        </Box>
        <Box width="full">
          <ResetPasswordForm />
        </Box>
      </VStack>
    </Flex>
  );
};

export default ResetPassword;
