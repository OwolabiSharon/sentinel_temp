import { VStack, HStack, Icon, Box, Text, Image } from '@chakra-ui/react';
import { BsArrowUpRight, BsCircleFill } from 'react-icons/bs';

import { IconMapping } from '~/lib/utils';

type ServiceListItemProps = {
  data: any;
  name: string;
  icon_url: string;
  lastOutage: string;
  latest_status: any;
  up: any;
  onClick: (data: any) => void;
};
const ServiceListItem = ({
  data,
  name,
  icon_url,
  lastOutage,
  latest_status,
  up,
  onClick,
}: ServiceListItemProps) => {
  return (
    <VStack
      rounded="md"
      shadow="sm"
      width="full"
      px={4}
      py={3}
      bgColor="white"
      _hover={{
        cursor: 'pointer',
        border: '1px solid #F2F4F7',
        boxShadow: '0px 6px 10px rgba(1, 23, 50, 0.15)',
        rounded: 'base',
        transition: 'all 300ms ease-in',
      }}
      onClick={() => onClick(data)}
    >
      <HStack width="full" justify="space-between" align="start">
        <Box display="inline-flex" alignContent="center">
          <Box width="fit-content">
            <Image width={{ base: 6 }} src={icon_url} />
          </Box>
          <Text
            ml={1}
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="150%"
            fontWeight="medium"
          >
            {name}
          </Text>
        </Box>
        <Icon
          boxSize={{ base: 6 }}
          as={BsCircleFill}
          color={up ? 'brand.success.main' : 'brand.error.main'}
          borderWidth="1px"
          borderColor={up ? '#d9fad1' : '#fde7e7'}
          borderRadius="100px"
        />
      </HStack>
      <HStack width="full" justify="space-between" align="end">
        <Box color="brand.darkGray.800">
          <Text fontSize="sm" lineHeight="120%">
            Last outage
          </Text>
          <Text
            fontSize={{ base: 'xs' }}
            fontWeight="semibold"
            lineHeight="150%"
          >
            {lastOutage}
          </Text>
        </Box>
        <Icon
          as={BsArrowUpRight}
          boxSize="0.78rem"
          color="brand.primary.900"
          _groupHover={{
            color: 'brand.primary.800',
          }}
        />
      </HStack>
    </VStack>
  );
};

export default ServiceListItem;
