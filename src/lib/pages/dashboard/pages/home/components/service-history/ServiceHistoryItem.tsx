import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { IconMapping } from '~/lib/utils';

type ServiceHistoryItemProps = {
  status: string;
  name: string;
  provider_name: string;
  icon_url: string;
  showBorderBottom?: boolean;
};
const ServiceHistoryItem = ({
  status,
  name,
  provider_name,
  icon_url,
  showBorderBottom,
}: ServiceHistoryItemProps) => {
  return (
    <Box
      borderBottom="solid"
      borderBottomColor={showBorderBottom ? 'gray.200' : 'transparent'}
      borderBottomWidth={1}
      mb={{ base: 3 }}
      p={1.5}
    >
      <Flex
        justify={{ base: 'space-between' }}
        align={{ base: 'center' }}
        width="full"
        direction={{ base: 'row' }}
        gap={6}
      >
        <Box display="inline-flex" alignItems="center" justifyContent="center">
          <Image width={{ base: '8' }} src={icon_url} />
          <Text
            textAlign={{ base: 'right' }}
            fontSize={{ base: 'md' }}
            fontWeight="medium"
            ml={1}
          >
            {name}
          </Text>
        </Box>
        <Box
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width="90%"
        >
          <Text
            fontSize={{ base: 'sm' }}
            color="brand.darkGray.900"
            mb={{ base: 2 }}
            textAlign="right"
            lineHeight="120%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {provider_name} {name} {status}
          </Text>
        </Box>
      </Flex>
      <Text
        textAlign={{ base: 'right' }}
        lineHeight="120%"
        fontSize={{ base: 'sm' }}
        color="brand.darkGray.800"
      >
        {status}
      </Text>
    </Box>
  );
};

export default ServiceHistoryItem;
