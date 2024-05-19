import { HStack, VStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import supabase from '../../supabase';
import { PrimaryButton } from '~/lib/components/button';
import ChakraLink from '~/lib/components/ChakraLink';
import FormInput from '~/lib/components/form/FormInput';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phoneNumber: '',
    password: '',
  });

  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Failed to register user:', error.message);
      } else {
        // User registration successful
        console.log('User created:', data);
        // Redirect or perform other actions after successful registration
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <VStack as="form" py={3}>
        <HStack align="start">
          <FormInput
            label="First Name*"
            inputProps={{
              type: 'text',
              name: 'firstName',
              placeholder: 'First name',
              isRequired: true,
              onChange: handleInputChange,
            }}
          />
          <FormInput
            label="Last Name*"
            inputProps={{
              type: 'text',
              name: 'lastName',
              placeholder: 'Last name',
              isRequired: true,
              onChange: handleInputChange,
            }}
          />
        </HStack>
        <FormInput
          label="Email*"
          inputProps={{
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            isRequired: true,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          label="Company*"
          inputProps={{
            type: 'text',
            name: 'company',
            placeholder: 'Company',
            isRequired: true,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          label="Phone Number*"
          inputProps={{
            type: 'tel',
            name: 'phoneNumber',
            placeholder: 'Phone',
            isRequired: true,
            onChange: handleInputChange,
          }}
        />
        <FormInput
          label="Password*"
          inputProps={{
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            isRequired: true,
            onChange: handleInputChange,
          }}
        />
      </VStack>
      <PrimaryButton
        mb={2}
        isLoading={false}
        px="1.5rem"
        fontWeight="semibold"
        onClick={handleSubmit}
      >
        Sign up
      </PrimaryButton>
      <Text fontWeight="medium">
        Already have an account?{' '}
        <ChakraLink fontWeight="semibold" href="/login">
          Log in
        </ChakraLink>
      </Text>
    </>
  );
};

export default SignupForm;
