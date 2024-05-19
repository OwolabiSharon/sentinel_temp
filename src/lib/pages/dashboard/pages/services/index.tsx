// Services.tsx

import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Wrapper from '../../Wrapper';
import { PrimaryButton } from '~/lib/components/button';
import { CheckCard } from '~/lib/components/card';
import ServiceSearchField from '~/lib/components/form/ServiceSearchField';
import { SectionTitle } from '~/lib/components/title';
import supabase from '../../../../supabase';

const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
const localStorageData = userDataString ? JSON.parse(userDataString) : null;

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const { data, error } = await supabase.from('providers').select('*');
      if (error) {
        console.error('Error fetching services:', error);
        return;
      }
      setServices(data);
      setFilteredServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = (query: string) => {
    // Filter services based on the search query
    const filtered = services.filter((service) =>
      service.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleSelectionChange = (id: string, name: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, { id, name }]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    }
  };

  const handleSaveChanges = async() => {
    console.log('Selected items:', selectedItems);
    for (const item of selectedItems) {
      try {
        // Check if the item with provider_id exists in the monitored_providers table
        const { data: existingProviders, error } = await supabase
          .from('monitored_providers')
          .select('*')
          .eq('provider_id', item.id)
          .eq('organization_id', localStorageData?.organization.id);
    
        if (error) {
          console.error('Error checking for existing providers:', error.message);
          continue; // Move to the next item in case of an error
        }
    
        // If the provider doesn't exist, add it to the monitored_providers table
        if (!existingProviders || existingProviders.length === 0) {
          const { data: newProvider, error: addError } = await supabase
            .from('monitored_providers')
            .insert({
              provider_id: item.id,
              organization_id: localStorageData?.organization.id
            });
    
          if (addError) {
            console.error('Error adding provider to monitored_providers:', addError.message);
            continue; // Move to the next item in case of an error
          }
    
          console.log('Provider added to monitored_providers:', newProvider);
        }
        else {
          console.log("provider already monitored")
          
        }
      } catch (error: any) {
        console.error('Error:', error?.message);
        continue; // Move to the next item in case of an error
      }
    }
    
  };

  return (
    <Wrapper>
      <NextSeo title="Services" />
      <SectionTitle mb={{ base: 8 }}>
        Add Third-Party Software and Services
      </SectionTitle>
      <Box maxWidth="md">
        {/* Pass handleSearch function to ServiceSearchField */}
        <ServiceSearchField onSearch={handleSearch} />
      </Box>
      <Flex wrap="wrap" rowGap={{ base: 4 }} columnGap={{ base: 4 }} my={{ base: 8 }}>
        {filteredServices.map((service, index) => (
          <CheckCard
            id={service.id}
            key={index}
            name={service.name}
            icon={service.icon_url}
            iconProps={{ ...service.iconProps }}
            width={{ base: 'full', md: '11rem', lg: '12rem' }}
            onChange={handleSelectionChange}
          />
        ))}
      </Flex>
      <Box mt={{ base: 6 }} mx={['auto', 'unset']} width="fit-content">
        <PrimaryButton onClick={handleSaveChanges}>Save changes</PrimaryButton>
      </Box>
    </Wrapper>
  );
};

export default Services;
