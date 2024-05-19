/* eslint-disable react/no-array-index-key */
import { HStack, Box, Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PrimaryButton } from '~/lib/components/button';
import { SectionTitle } from '~/lib/components/title';
import useServices from '~/lib/pages/dashboard/hooks';

import ServiceListItem from './ServiceListItem';
import { useState, useEffect } from 'react';
import supabase from '../../../../../../supabase';

type ServiceListProps = {
  cb: (data: any) => void;
};

const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
const data = userDataString ? JSON.parse(userDataString) : null;

const ServiceList = ({ cb }: ServiceListProps) => {
  const [services, setServices] = useState<any[]>([]);
  const router = useRouter();
  const navigateToServices = () => router.push('/dashboard/services');

  const getServices = async () => {
    try {
      const { data: response, error } = await supabase
        .from('monitored_providers')
        .select('*, providers(*)')
        .eq('organization_id', data?.organization.id);
      if (error) {
        console.error('Error fetching services:', error);
        return;
      }
      localStorage.setItem('monitored_providers', JSON.stringify(response));
      
      setServices(response);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);

  return (
    <Box py={4}>
      <HStack justify="space-between" align="center" my={{ base: 4 }}>
        <SectionTitle>Your Third-Party Apps and Services - {services.length}</SectionTitle>
        <PrimaryButton onClick={navigateToServices}>Add new</PrimaryButton>
      </HStack>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gridGap={{ base: 3 }}
      >
        {services.map((value, index) => (
          <GridItem
            key={`${value.providers.name}.${index}`}
            _hover={{
              shadow: 'md',
              transition: 'all 100ms ease-in',
            }}
            role="group"
          >
            <ServiceListItem onClick={cb} {...value.providers} data = {...value.providers} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceList;
