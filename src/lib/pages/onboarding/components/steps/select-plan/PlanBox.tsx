/* eslint-disable react/no-array-index-key */
import { Box, Flex, HStack, Icon, Radio, Text } from '@chakra-ui/react';
import { BsCheck2All } from 'react-icons/bs';

type PlanBoxProps = {
  value: string;
  currentValue: string;
  head: string[];
  subTexts: string[];
  updateValue: () => void;
};
const PlanBox = ({
  value,
  currentValue,
  head,
  subTexts,
  updateValue,
}: PlanBoxProps) => {
  return (
    <Box
      boxShadow="sm"
      borderColor="brand.primary.900"
      borderRadius="lg"
      px={6}
      py={8}
      _hover={{
        borderWidth: currentValue === value ? 2.5 : 1,
        cursor: 'pointer',
      }}
      borderWidth={currentValue === value ? 2.5 : 0}
      height="40"
      width={{ base: 'full', md: 'md' }}
      mb={2}
      bgColor="white"
      onClick={updateValue}
    >
      <Flex direction="row" justify="space-between" align="start">
        <Radio
          value={value}
          width="min-content"
          colorScheme="brand.blue"
          size="lg"
          // borderColor="brand.primary.900"
          // variant="groove"
        />
        <Box width="90%">
          <HStack justify="space-between" fontWeight="bold" mt={-1.5} mb={2.5}>
            {head.map((headText, index) => (
              <Text key={index}>{headText}</Text>
            ))}
          </HStack>
          {subTexts.map((text, index) => (
            <HStack key={index} fontSize="smaller" mb={1.5} color="GrayText">
              <Icon boxSize={4} as={BsCheck2All} />
              <Text>{text}</Text>
            </HStack>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlanBox;
