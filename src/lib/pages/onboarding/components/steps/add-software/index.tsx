/* eslint-disable react/no-array-index-key */
import {
  CheckboxGroup,
  Heading,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import StepFooter from '../../StepFooter';
import { CheckCard } from '~/lib/components/card';
import ServiceSearchField from '~/lib/components/form/ServiceSearchField';
import FadeIn from '~/lib/components/motion/fade-in';
import useServices from '~/lib/hooks/services';
import type { StepComponentProps } from '~/lib/types';
import supabase from '../../../../../supabase';

type AddSoftwareProps = {
  selectedPlan?: {};
  initialValue?: string[];
  orgData?: any
};
const AddSoftware = ({
  cb,
  initialValue,
  orgData
}: StepComponentProps & AddSoftwareProps) => {
  const [softwares, updateSoftwares] = useState<(string | number)[]>(
    initialValue || []
  );
  const [services, setServices] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  //const [orgId, setOrgId] = useState<any>();
  
  
  
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
          const { data: newProvider, error: addError } = await supabase
            .from('monitored_providers')
            .insert({
              provider_id: item.id,
              organization_id: orgData.orgId
            });
    
          if (addError) {
            console.error('Error adding provider to monitored_providers:', addError.message);
            continue; // Move to the next item in case of an error
          }
    
          console.log('Provider added to monitored_providers:', newProvider);
      } catch (error: any) {
        console.error('Error:', error?.message);
        continue; // Move to the next item in case of an error
      }
    }
    
  };
  const handleClick = () => {
    handleSaveChanges()
    cb()({ softwares: selectedItems as string[], step: 2 });
  };

  useEffect(() => {
    getServices();
  }, []);
  return (
    <FadeIn
      props={{
        width: 'full',
        px: { base: 4 },
      }}
    >
      <VStack>
        <Heading size="md" m={4} textAlign="center">
          Add your team&apos;s third-party Software and Services
        </Heading>
        <VStack justify="center" gap={4}>
          <VStack width="full" maxWidth="xl">
          <ServiceSearchField onSearch={handleSearch} />
          </VStack>
          <CheckboxGroup onChange={updateSoftwares} value={softwares}>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(3, 4fr)',
                lg: 'repeat(4, 3fr)',
              }}
              gap={4}
              width="100vw"
              maxWidth="4xl"
              mx={4}
              p={{ base: 2 }}
            >
              {filteredServices.map((value, index) => (
                <GridItem key={index}>
                  <CheckCard
                    id={value.id}
                    name={value.name}
                    icon={value.icon_url}
                    iconProps={{ ...value.iconProps }}
                    fontSize="smaller"
                    width={{ base: 'full' }}
                    onChange={handleSelectionChange}
                  />
                </GridItem>
              ))}
            </Grid>
          </CheckboxGroup>
        </VStack>
      </VStack>

      <StepFooter
        clickHandler={handleClick}
        disabled={softwares.length === 0}
        enableSkipBtn={softwares.length === 0}
      />
    </FadeIn>
  );
};

export default AddSoftware;
