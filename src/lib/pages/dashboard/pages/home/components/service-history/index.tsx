import { Flex, Box, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

import supabase from '../../../../../../supabase';
import historySupabase from '../../../../historySupabase';
import { SectionTitle } from '~/lib/components/title';
import useServicesDown from '~/lib/pages/dashboard/hooks/services-down';

import ServiceHistoryItem from './ServiceHistoryItem';
import ServiceOutageCard from './ServiceOutageCard';

const ServiceHistory = () => {
  const [dayHistory, setDayHistory] = useState<any[]>([]);
  const [outages7Days, setOutages7Days] = useState(0);
  const [outages30Days, setOutages30Days] = useState(0);

  const userDataString =
    typeof window !== 'undefined'
      ? localStorage.getItem('monitored_providers')
      : null;
  const services = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    const fetchHistory = async (providerIds: any, days: any) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      console.log('prov ids', providerIds);

      const { data: serviceData, error: serviceError } = await historySupabase
        .from('service_histories')
        .select(
          'created_at, name, status, services!inner(provider_id, providers(name, icon_url))'
        )
        .gte('created_at', startDate.toISOString())
        .in('services.provider_id', providerIds);

      const { data: componentData, error: componentError } =
        await historySupabase
          .from('component_histories')
          .select(
            'created_at, name, status, components!inner(services!inner(provider_id, providers(name, icon_url)))'
          )
          .in('components.services.provider_id', providerIds)
          .gte('created_at', startDate.toISOString());

      if (serviceError || componentError) {
        console.error(
          'Error fetching history:',
          serviceError?.message || componentError?.message
        );
        return [];
      }
      console.log([...serviceData, ...componentData]);

      return [...serviceData, ...componentData];
    };

    const fetchData = async () => {
      const providerIds = services.map((service: any) => service.provider_id);
      const historyData = await fetchHistory(providerIds, 30);

      const endDate7Days = new Date();
      endDate7Days.setDate(endDate7Days.getDate() - 7);

      const filteredFullHistoryData = historyData.filter(
        (entry) => entry.status === 'Not Operational' || 'Partial Outage'
      );
      const filteredData7Days = filteredFullHistoryData.filter(
        (entry) => new Date(entry.created_at) >= endDate7Days
      );

      const endDate24Hours = new Date();
      endDate24Hours.setHours(endDate24Hours.getHours() - 24);

      const filtered24HourHistory = historyData.filter(
        (entry) => new Date(entry.created_at) >= endDate24Hours
      );
      const unifiedDataList = filtered24HourHistory.map((data: any) => {
        if (data.components) {
          const {
            created_at,
            status,
            name,
            components: {
              services: {
                providers: { name: provider_name, icon_url },
              },
            },
          } = data;
          return { created_at, status, name, provider_name, icon_url };
        }
        if (data.services) {
          const {
            created_at,
            status,
            name,
            services: {
              providers: { name: provider_name, icon_url },
            },
          } = data;
          return { created_at, status, name, provider_name, icon_url };
        }
        return {}; // Handle unrecognized data format
      });

      setDayHistory(unifiedDataList);

      setOutages7Days(filteredData7Days.length);
      setOutages30Days(filteredFullHistoryData.length);
    };

    fetchData();
  }); // Make sure to include any dependencies if required

  return (
    <Flex
      wrap={{ base: 'wrap', md: 'nowrap', '2md': 'wrap', lg: 'nowrap' }}
      gap="8px"
      align="start"
      my={{ base: 4 }}
      height="315px"
    >
      <Flex
        bgColor="white"
        p={{ base: 4 }}
        rounded="base"
        shadow="sm"
        width={{ base: 'full' }}
        border="1px solid #F2F4F7"
        direction="column"
      >
        <SectionTitle mb={{ base: 4 }}>24-hour History</SectionTitle>
        <Box>
          {dayHistory.map((value, index) => (
            <ServiceHistoryItem
              {...value}
              // eslint-disable-next-line react/no-array-index-key
              key={`${value.name}.${index}`}
              showBorderBottom={index !== services.length - 1}
            />
          ))}
        </Box>
      </Flex>
      <VStack
        padding="24px"
        alignItems="flex-start"
        gap={4}
        width={{ base: 'full', md: 'unset' }}
        pb={{ '2md': 12 }}
      >
        <ServiceOutageCard
          headingText="Last 7 days"
          numOfOutage={outages7Days}
        />
        <ServiceOutageCard
          headingText="Last 30 days"
          numOfOutage={outages30Days}
        />
      </VStack>
    </Flex>
  );
};

export default ServiceHistory;
