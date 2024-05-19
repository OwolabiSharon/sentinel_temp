import { Box, HStack, Text } from '@chakra-ui/react';

import { SectionTitle2 } from '~/lib/components/title';

const history = [
  {
    time: 'Jan 5, 2023',
    pay: '$6',
  },
  {
    time: 'Feb 5, 2023',
    pay: '$6',
  },
  {
    time: 'March 5, 2023',
    pay: '$6',
  },
];

const BillingHistory = () => {
  return (
    <Box
      width={['full', 'xs']}
      bgColor="whiteAlpha.900"
      px={[6]}
      py={[4]}
      height="fit-content"
      rounded="md"
    >
      <SectionTitle2>Billing History</SectionTitle2>
      <Box my={[4]} fontSize={['xs']}>
        {history.map((value, index) => (
          <HStack
            justify="space-between"
            py={[1.5]}
            borderBottomWidth="1px"
            borderBottomColor={
              index !== history.length - 1 ? 'gray.100' : 'transparent'
            }
            key={value.time}
          >
            <Text color="GrayText">{value.time}</Text>
            <Text fontWeight={['semibold']}>{value.pay}</Text>
          </HStack>
        ))}
      </Box>
    </Box>
  );
};

export default BillingHistory;
