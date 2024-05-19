import { Box, HStack, Icon, Text, VStack, Image } from '@chakra-ui/react';
import { BsArrowUpRight, BsCircleFill } from 'react-icons/bs';

import { IconMapping } from '~/lib/utils';

type ServiceStatusCardProps = {
  name: string;
  subService: string;
  lastOutage: string;
  onClick: (name: string) => void;
};
const ServiceStatusCard = ({
  name,
  subService,
  lastOutage,
  onClick,
}: ServiceStatusCardProps) => {
  return (
    <VStack
      width="full"
      bgColor="whiteAlpha.900"
      py={{ base: 4 }}
      px={{ base: 6 }}
      rounded="base"
      border="1px solid #F2F4F7"
      _hover={{
        cursor: 'pointer',
        border: '1px solid #F2F4F7',
        boxShadow: '0px 6px 10px rgba(1, 23, 50, 0.15)',
        rounded: 'base',
        transition: 'all 300ms ease-in',
      }}
      onClick={() => onClick(name)}
    >
      <HStack width="full" justify="space-between" align="start">
        <Box display="inline-flex" fontSize={{ base: 'md', md: 'unset' }}>
          <Image width={{ base: 6 }} src={IconMapping[name.toLowerCase()]} />
          <Text ml={2} fontSize="md" fontWeight="medium">
            {name}
          </Text>
        </Box>
        <Icon
          as={BsCircleFill}
          borderWidth="1px"
          borderColor="#fde7e7"
          color="brand.error.main"
          borderRadius="100px"
          boxSize={6}
        />
      </HStack>
      <HStack width="full" justify="space-between" align="end">
        <Box color="brand.darkGray.800">
          <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight="120%">
            {subService}
          </Text>
          <Text fontSize={{ base: 'xs' }} fontWeight="medium" lineHeight="150%">
            {lastOutage}
          </Text>
        </Box>
        <Icon color="brand.primary.900" as={BsArrowUpRight} boxSize={3} />
      </HStack>
    </VStack>
  );
};

export default ServiceStatusCard;
