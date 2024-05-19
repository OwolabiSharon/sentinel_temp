import { Box } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

import historySupabase from '../../../../../historySupabase';
import { SectionTitle2 } from '~/lib/components/title';

import OutageCard from './OutageCard'; // Import the OutageCard component

type ServiceFeedProps = {
  service: any;
};

const ServiceFeed = ({ service }: ServiceFeedProps) => {
  const [subProviders, setSubProviders] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async (days: any) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data: serviceData, error: serviceError } = await historySupabase
        .from('service_histories')
        .select(
          'created_at, name, status, services!inner(provider_id, providers(name))'
        )
        .gte('created_at', startDate.toISOString())
        .eq('services.provider_id', service.id);

      const { data: componentData, error: componentError } =
        await historySupabase
          .from('component_histories')
          .select(
            'created_at, name, status, components!inner(services!inner(provider_id, providers(name)))'
          )
          .eq('components.services.provider_id', service.id)
          .gte('created_at', startDate.toISOString());

      if (serviceError || componentError) {
        console.error(
          'Error fetching history:',
          serviceError?.message || componentError?.message
        );
        return [];
      }

      console.log([...serviceData, ...componentData]);

      const allData = [...serviceData, ...componentData];

      interface SubProvider {
        name: string;
        status: string;
        outages: { name: string; status: string }[];
      }

      const sub_providers: SubProvider[] = [];

      // Iterate through allData to populate sub_providers
      allData.forEach((item) => {
        const { name, status, created_at } = item;

        // Check if sub-provider already exists in sub_providers array
        const existingProviderIndex = sub_providers.findIndex(
          (provider) => provider.name === name
        );

        if (existingProviderIndex === -1) {
          // If sub-provider doesn't exist, create a new entry
          sub_providers.push({
            name,
            status,
            outages: [],
          });
        } else {
          // If sub-provider exists, update its status
          sub_providers[existingProviderIndex].status = status;
        }
      });

      console.log(sub_providers);
      return sub_providers;
    };

    const loadProviders = async () => {
      return fetchHistory(30);
    };

    const fetchData = async () => {
      const data = await loadProviders();
      setSubProviders(data);
    };

    fetchData();
  }, [service.id]);

  return (
    <Box
      p={{ base: 4 }}
      width={{ base: 'full' }}
      bgColor="whiteAlpha.900"
      shadow="sm"
      rounded="sm"
    >
      <SectionTitle2 mb={{ base: 2, md: 5 }}>Feed</SectionTitle2>
      {subProviders.map((value: any, index: any) => (
        <OutageCard />
      ))}
    </Box>
  );
};

export default memo(ServiceFeed);
