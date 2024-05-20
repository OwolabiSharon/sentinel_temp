import { Box, Divider, Flex, Text, Spacer } from '@chakra-ui/react';

const OutageCard = ({ name, status, details }: any) => {
  console.log(details);

  return (
    <Box
      w={{ base: '100%', md: '100%' }} // Adjust width based on screen size
      h="auto"
      display="flex"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
        <Box
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
              {name}
            </Text>
            <Spacer />
            <Flex justify="center" alignItems="flex-start">
              <Text
                color={status === 'Operational' ?  'green.500' : 'orange.500'}
                fontSize="base"
                lineHeight="tight"
              >
                {status}
              </Text>
            </Flex>
          </Flex>
          {details.map((detail: any, detailIndex: any) => (
            <Flex
              key={detailIndex}
              justifyItems="between"
              alignItems="center"
              w="100%"
            >
              <Text color="neutral.600" fontSize="base" lineHeight="tight">
                {detail.name} {detail.status}
              </Text>
              <Spacer />
              <Text color="zinc.500" fontSize="base" lineHeight="tight">
                {detail.created_at}
              </Text>
            </Flex>
          ))}
        </Box>
    </Box>
  );
};
 
export default OutageCard;
// const issues = [
//   {
//     title: 'USSD went down',
//     severity: 'minor',
//     details: [
//       { description: 'Outage has been resolved', date: '3 hours ago' },
//       {
//         description: 'Delay in USSD transactions processing',
//         date: '4 hours ago',
//       },
//     ],
//   },
//   {
//     title: 'Transfers went down',
//     severity: 'major',
//     details: [
//       { description: 'Outage has been resolved', date: '7 days ago at 14:00' },
//       { description: 'Delay in transfers', date: '7 days ago at 14:45' },
//       { description: 'Downtime in transfers', date: '7 days ago at 15:00' },
//     ],
//   },
//   // Add more issues as needed
// ];

// const App = () => {
//   return (
    
//       <OutageCard issues={issues} />
    
//   );
// };

// export default App;

// const dateString = '2020-05-14T04:00:00Z'

// const formatDate = (dateString) => {
//   const options = { year: "numeric", month: "long", day: "numeric"}
//   return new Date(dateString).toLocaleDateString(undefined, options)
// }

// console.log(formatDate(dateString))
