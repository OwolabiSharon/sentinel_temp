import { VStack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import supabase from '../../supabase';
import { PrimaryButton } from '~/lib/components/button';
import ChakraLink from '~/lib/components/ChakraLink';
import FormInput from '~/lib/components/form/FormInput';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      // Validate email and password
      if (!email || !password) {
        // Display error toast if email or password is empty
        toast({
          title: 'Error',
          description: 'Please enter both email and password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('login failed:', error);
        const errorMessage = 'Login failed. Please check your credentials.';

        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log('login successful: ', data);
        // Display success toast for successful login
        toast({
          title: 'Success',
          description: 'Login successful!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Display error toast for unexpected errors
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <VStack as="form" py={{ base: 2, md: 6 }} width="full">
        <FormInput
          label="Email*"
          inputProps={{
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            isRequired: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
          }}
        />
        <FormInput
          label="Password*"
          inputProps={{
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            isRequired: true,
            value: password,
            onChange: (e) => setPassword(e.target.value),
          }}
        >
          <ChakraLink href="/signup" fontWeight="semibold" lineHeight="200%">
            Forgot password
          </ChakraLink>
        </FormInput>
      </VStack>
      <PrimaryButton mb={2} px={6} fontWeight="medium" onClick={handleLogin}>
        Log in
      </PrimaryButton>
      <Text fontWeight="medium">
        Don&apos;t have an account?{' '}
        <ChakraLink fontWeight="semibold" href="/signup">
          Sign up
        </ChakraLink>
      </Text>
    </>
  );
};

export default SignupForm;
