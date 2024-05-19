import {
  Box,
  Button,
  HStack,
  Text,
  useBoolean,
  Image,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import FormInput from '~/lib/components/form/FormInput';
import MTextArea from '~/lib/components/form/MTextArea';
import { SectionTitle2 } from '~/lib/components/title';

const billingInfo = {
  paymentMethod: '****2323',
  billingEmail: 'ahmad@newco.com',
  billingAddress: 'Dolphin estate, Ikoyi, Lagos state.',
  cvv: '***',
};

const BillingInformation = () => {
  const [editState, { toggle }] = useBoolean(false);
  return (
    <Box
      width={['full', 'md']}
      bgColor="whiteAlpha.900"
      px={[6]}
      py={[4]}
      rounded="md"
    >
      <HStack justify="space-between">
        <SectionTitle2>Billing Information</SectionTitle2>
        <Button
          fontSize="0.95rem"
          color="brand.primary.900"
          variant="unstyled"
          onClick={toggle}
        >
          Edit
        </Button>
      </HStack>
      <Box fontSize="sm">
        <form>
          <HStack
            justify="space-between"
            borderBottomWidth="1px"
            borderBottomColor="gray.100"
          >
            <Text color="brand.darkGray.900" fontWeight="medium" fontSize="sm">
              Payment method
            </Text>
            <Box py={[3]}>
              {!editState ? (
                <Text textAlign="right">
                  <Image
                    src="/assets/svg/mastercard.svg"
                    display="inline"
                    px={1}
                  />
                  {billingInfo.paymentMethod}
                </Text>
              ) : (
                <InputGroup>
                  <InputRightElement>
                    <Image
                      src="/assets/svg/mastercard.svg"
                      display="inline"
                      px={1}
                    />
                  </InputRightElement>
                  <FormInput
                    mb={0}
                    inputProps={{
                      type: 'text',
                      placeholder: billingInfo.paymentMethod,
                      pr: { base: 9 },
                      width: { base: '200px', md: '242px' },
                      fontSize: ['sm'],
                    }}
                    required
                  />
                </InputGroup>
              )}
            </Box>
          </HStack>
          <HStack
            justify="space-between"
            borderBottomWidth="1px"
            borderBottomColor="gray.100"
          >
            <Text color="brand.darkGray.900" fontWeight="medium" fontSize="sm">
              CVV
            </Text>
            <Box py={[3]}>
              {!editState ? (
                <Text textAlign="right">{billingInfo.cvv}</Text>
              ) : (
                <FormInput
                  mb={0}
                  inputProps={{
                    type: 'text',
                    placeholder: billingInfo.cvv,
                    fontSize: ['sm'],
                    width: { base: '200px', md: '242px' },
                  }}
                  required
                />
              )}
            </Box>
          </HStack>
          <HStack
            justify="space-between"
            borderBottomWidth="1px"
            borderBottomColor="gray.100"
          >
            <Text color="brand.darkGray.900" fontWeight="medium" fontSize="sm">
              Billing email
            </Text>
            <Box py={[3]}>
              {!editState ? (
                <Text textAlign="right">{billingInfo.billingEmail}</Text>
              ) : (
                <FormInput
                  mb={0}
                  inputProps={{
                    type: 'email',
                    placeholder: billingInfo.billingEmail,
                    fontSize: ['sm'],
                    width: { base: '200px', md: '242px' },
                  }}
                  required
                />
              )}
            </Box>
          </HStack>
          <HStack justify="space-between">
            <Text color="brand.darkGray.900" fontWeight="medium" fontSize="sm">
              Billing address
            </Text>
            <Box py={[3]}>
              {!editState ? (
                <Text textAlign="right">{billingInfo.billingAddress}</Text>
              ) : (
                <MTextArea
                  placeholder={billingInfo.billingAddress}
                  fontSize={['sm']}
                  isRequired
                  width={{ base: '200px', md: '242px' }}
                />
              )}
            </Box>
          </HStack>
          {editState && (
            <HStack justify="end">
              <Button ml="full" colorScheme="blackAlpha">
                Save changes
              </Button>
            </HStack>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default BillingInformation;
