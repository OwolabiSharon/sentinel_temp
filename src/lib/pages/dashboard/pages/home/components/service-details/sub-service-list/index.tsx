/* eslint-disable react/no-array-index-key */
import { Box, HStack, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';

import { SectionTitle2 } from '../../../../../../../components/title';
import supabase from '../../../../../../../supabase';
import type { TService } from '../../../../../hooks';

import SubServiceListItem from './SubServiceListItem';

type SubServiceListProps = {
  service: any;
  openSettingsCb: () => void;
};

const SubServiceList = ({ service, openSettingsCb }: SubServiceListProps) => {
  const [subServiceData, setSubServiceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Perform Supabase query to fetch user subscriptions
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('id, services(name, status), components(name, status)')
        .eq('provider_id', service.id);

      if (error) {
        console.error('Error fetching user subscriptions:', error.message);
        return;
      }
      console.log(data, 'test data format cocomelon');

      const formattedData = data.map((item: any) => {
        if (!item.services) {
          return item.components;
        }
        return item.services;
      });

      setSubServiceData(formattedData);
    };

    fetchData();
  }, [service.id]);

  const handleUpgradeClick = () => {
    
    
    localStorage.setItem('selectedProviderId', service.id);
    console.log('selectedProviderId set to:', localStorage.getItem('selectedProviderId'));
    console.log(service.id, "service id that is being passed", service.name);
    router.push({
      pathname: '/dashboard/settings',
    });
  };

  const router = useRouter();
  return (
    <Box
      p={{ base: 4 }}
      width={{ base: 'full', md: 'lg' }}
      bgColor="whiteAlpha.900"
      shadow="sm"
      rounded="sm"
      height="fit-content"
    >
      <HStack justify="space-between" align="center" mb={{ base: 0, md: 4 }}>
        <SectionTitle2>Sub-Services</SectionTitle2>
        <Icon
          onClick={handleUpgradeClick}
          as={AiFillSetting}
          color="brand.primary.main"
          boxSize={6}
          _hover={{ cursor: 'pointer' }}
        />
      </HStack>
      {subServiceData.map((value, index, array) => (
        <SubServiceListItem
          name={value.name}
          up={value.status}
          lastOutage={value.status}
          key={`${value.name}.${index}`}
          showBorderBottom={index !== array.length - 1}
        />
      ))}
    </Box>
  );
};

export default memo(SubServiceList);
