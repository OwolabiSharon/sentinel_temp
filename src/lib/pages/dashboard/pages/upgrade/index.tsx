/* eslint-disable react/jsx-no-bind */
import {
  Box,
  HStack,
  Heading,
  Text,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Button,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import Wrapper from '../../Wrapper';
import FadeIn from '~/lib/components/motion/fade-in';

const IndexPage = () => {
  const [emails, setEmails] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validation

  function validateEmail(email: any) {
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function handleKeyDown(e: any) {
    if (e.key !== 'Enter') return;
    const { value } = e.target;
    if (!value.trim()) return;
    if (!validateEmail(value)) {
      setIsValidEmail(false);
      return;
    }
    setIsValidEmail(true);
    setEmails([...emails, value]);
    e.target.value = '';
  }

  function removeEmail(index: any) {
    setEmails(emails.filter((el, i) => i !== index));
  }

  return (
    <Wrapper>
      <NextSeo title="Upgrade" />
      <FadeIn>
        <HStack justify="space-between">
          <Box>
            <Heading as="h1" size={{ base: 'md', md: 'lg' }} mb={{ base: 5 }}>
              Upgrade to Business
            </Heading>
            <Box>
              <Heading
                py="4"
                as="h4"
                size={{ base: 'sm', md: 'md' }}
                mb={{ base: 5 }}
              >
                Add members of your team
              </Heading>
              <VStack>
                <HStack>
                  {emails.map((email, index) => (
                    <Tag
                      key={index}
                      size="lg"
                      mx="6"
                      borderRadius="8"
                      variant="black"
                      bg="#D2E3F9"
                    >
                      <TagLabel>{email}</TagLabel>
                      <TagCloseButton onClick={() => removeEmail(index)} />
                    </Tag>
                  ))}
                </HStack>
                <Box align="start">
                  <VStack align="start">
                    <Text>Email</Text>
                    <Input
                      onKeyDown={handleKeyDown}
                      placeholder="Email"
                      size="md"
                      isInvalid={!isValidEmail} // Apply red border if email is invalid
                    />
                    {!isValidEmail && (
                      <Text color="red.500" fontSize="sm">
                        Please enter a valid email address
                      </Text>
                    )}
                    <Text fontSize="xs" color="#6B6F75">
                      Separate emails with enter
                    </Text>
                  </VStack>
                </Box>
                <VStack pt="48px" justifyContent="center">
                  <Text color="#000000" fontSize="md">
                    You will be charged{' '}
                  </Text>
                  <Heading as="h5" size={{ base: 'md', md: 'md' }}>
                    $6/month
                  </Heading>

                  <Button colorScheme="blue">Proceed to payment</Button>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </HStack>
      </FadeIn>
    </Wrapper>
  );
};

export default IndexPage;
