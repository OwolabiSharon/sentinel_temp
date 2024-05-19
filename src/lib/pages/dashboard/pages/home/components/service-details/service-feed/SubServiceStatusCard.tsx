/* eslint-disable react/no-array-index-key */
import { Box, HStack, Text } from '@chakra-ui/react';

type OutagesCardProps = {
  message: string;
  time: string;
};
const OutagesCard = ({ message, time }: OutagesCardProps) => {
  return (
    <HStack justify="space-between">
      <Text fontSize={{ base: 'xs' }}>{message}</Text>
      <Text fontSize={{ base: '2xs' }}>{time}</Text>
    </HStack>
  );
};

type SubServiceStatusCardProps = {
  name: string;
  level: string;
  outages: OutagesCardProps[];
  borderBottom?: boolean;
};
const SubServiceStatusCard = ({
  name,
  level,
  outages,
  borderBottom,
}: SubServiceStatusCardProps) => {
  return (
    <Box
      mt={{ base: 2 }}
      mb={{ base: 2 }}
      p={{ base: 1 }}
      borderBottomWidth={borderBottom ? 1 : '0px'}
      borderColor="gray.200"
    >
      <HStack justify="space-between" mb={{ base: 2 }}>
        <Text fontSize={{ base: 'sm' }} fontWeight="medium">
          {name} went down
        </Text>
        <Text
          textTransform="capitalize"
          color={level === 'minor' ? 'brand.error.partial' : 'brand.error.main'}
          fontSize={{ base: 'smaller' }}
        >
          {level} outage
        </Text>
      </HStack>
      <Box color="GrayText" fontSize="sm">
        {outages.map((value, index) => (
          <OutagesCard {...value} key={`${value.message}${index}`} />
        ))}
      </Box>
    </Box>
  );
};

export default SubServiceStatusCard;
