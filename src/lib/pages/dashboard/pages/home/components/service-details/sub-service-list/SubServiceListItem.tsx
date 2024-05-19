import { HStack, Icon, Box, Text } from '@chakra-ui/react';
import { BsCircleFill } from 'react-icons/bs';

type SubServiceListItemType = {
  name: string;
  up: boolean;
  lastOutage: string;
  showBorderBottom: boolean;
};
const SubServiceListItem = ({
  name,
  up,
  lastOutage,
  showBorderBottom,
}: SubServiceListItemType) => {
  return (
    <Box
      py={{ base: 3 }}
      borderBottomWidth={1}
      borderColor={showBorderBottom ? 'gray.200' : 'transparent'}
    >
      <HStack justify="space-between" pb={{ base: 2 }}>
        <Text fontSize={{ base: 'sm' }} fontWeight="medium">
          {name}
        </Text>
        <Icon
          as={BsCircleFill}
          boxSize={{ base: 4, md: 5 }}
          color={up ? 'brand.success.main' : 'brand.error.main'}
        />
      </HStack>
      <HStack justify="space-between" color="GrayText">
        <Text fontSize={{ base: 'small' }}>Last outage</Text>
        <Text fontSize={{ base: 'smaller' }}>{lastOutage}</Text>
      </HStack>
    </Box>
  );
};

export default SubServiceListItem;
