import { Box, Flex } from '@chakra-ui/react';

import BillingHistory from './BillingHistory';
import BillingInformation from './BillingInformation';
import PlanCard from './PlanCard';

const Billing = () => {
  return (
    <Box maxWidth="container.lg">
      <Flex
        rowGap={[8]}
        columnGap={[12]}
        py={[8]}
        wrap={{ base: 'wrap', md: 'nowrap' }}
      >
        <PlanCard />
        <BillingHistory />
      </Flex>
      <BillingInformation />
    </Box>
  );
};

export default Billing;
