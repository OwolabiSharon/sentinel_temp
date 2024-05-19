/* eslint-disable react/no-array-index-key */
import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { BsCircleFill } from 'react-icons/bs';

import useServicesDown from '../../../../hooks/services-down';

import ServiceStatusCard from './ServiceStatusCard';

type ServiceStatusProps = {
  cb: (name: string) => void;
};

const ServiceStatus = ({ cb }: ServiceStatusProps) => {
  const { servicesDown: services } = useServicesDown();
  return (
    <Box width="full" maxWidth={{ md: 'container.sm' }} mx="auto">
      <VStack justify="center" align="center" mt={{ base: 8 }} mb={{ base: 4 }}>
        <HStack
          p={{ base: 4 }}
          bgColor={
            !services.length ? 'brand.success.light' : 'brand.error.light'
          }
          align="center"
          justify="center"
          width="full"
          rounded="base"
          mb={{ base: 1 }}
        >
          <Icon
            as={BsCircleFill}
            boxSize={6}
            color={!services.length ? 'brand.success.main' : 'brand.error.main'}
            borderWidth="1px"
            borderColor={!services.length ? '#d9fad1' : '#fde7e7'}
            borderRadius="100px"
          />
          <Text fontWeight="bold" mr={4} fontSize="lg">
            {services.length
              ? `${services.length} service is down`
              : 'All services are up'}
          </Text>
        </HStack>
        {services.length &&
          services.map((value, index) => (
            <ServiceStatusCard
              onClick={cb}
              {...value}
              key={`${value.name}.${index}`}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default ServiceStatus;
