import { Box, Divider, Flex, Text, Spacer } from '@chakra-ui/react';

const OutageCard = ({ title, severity, issues }: any) => {
  console.log(issues);

  return (
    <Box
      w={{ base: '100%', md: '100%' }} // Adjust width based on screen size
      h="auto"
      display="flex"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {issues.map((issue, index) => (
        <Box
          key={index}
          w="100%"
          h="auto"
          py="2"
          display="flex"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="2"
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Flex justify="space-between" alignItems="center" w="100%">
            <Text
              color="stone-950"
              fontSize={{ base: 'md', md: 'lg' }}
              lineHeight={{ base: '24px', md: '27px' }}
            >
              {issue.title}
            </Text>
            <Spacer />
            <Flex justify="center" alignItems="flex-start">
              <Text
                color={severity === 'major' ? 'red.500' : 'orange.500'}
                fontSize="base"
                lineHeight="tight"
              >
                {severity === 'major' ? 'Major' : 'Minor'} Outage
              </Text>
            </Flex>
          </Flex>
          {issue.details.map((detail, detailIndex) => (
            <Flex
              key={detailIndex}
              justifyItems="between"
              alignItems="center"
              w="100%"
            >
              <Text color="neutral.600" fontSize="base" lineHeight="tight">
                {detail.description}
              </Text>
              <Spacer />
              <Text color="zinc.500" fontSize="base" lineHeight="tight">
                {detail.date}
              </Text>
            </Flex>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const issues = [
  {
    title: 'USSD went down',
    severity: 'minor',
    details: [
      { description: 'Outage has been resolved', date: '3 hours ago' },
      {
        description: 'Delay in USSD transactions processing',
        date: '4 hours ago',
      },
    ],
  },
  {
    title: 'Transfers went down',
    severity: 'major',
    details: [
      { description: 'Outage has been resolved', date: '7 days ago at 14:00' },
      { description: 'Delay in transfers', date: '7 days ago at 14:45' },
      { description: 'Downtime in transfers', date: '7 days ago at 15:00' },
    ],
  },
  // Add more issues as needed
];

const App = () => {
  return (
    <Flex direction="column" alignItems="center">
      <OutageCard issues={issues} />
    </Flex>
  );
};

export default App;

// const dateString = '2020-05-14T04:00:00Z'

// const formatDate = (dateString) => {
//   const options = { year: "numeric", month: "long", day: "numeric"}
//   return new Date(dateString).toLocaleDateString(undefined, options)
// }

// console.log(formatDate(dateString))
