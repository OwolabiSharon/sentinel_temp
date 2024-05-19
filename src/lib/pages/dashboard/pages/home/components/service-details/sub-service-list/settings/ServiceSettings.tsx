import { Box, Flex, Button, Checkbox, Text, Divider, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import supabase from '../../../../../../../../supabase';
const userDataString = typeof window !== 'undefined' ? localStorage.getItem('fullAuthUserData') : null;
const userData = userDataString ? JSON.parse(userDataString) : null;
type MyObject = {
  [key: string]: any; // This allows dynamic keys with values of any type
};
const ServiceSettings = ({ data }: any) => {
  const toast = useToast(); 
  const [checkedItems, setCheckedItems] = useState(new Map());
  const [checkedServices, setCheckedServices] = useState<MyObject>({});

  // Function to toggle checkbox state
  const toggleCheckbox = async(serviceIndex: number, componentIndex?: number) => {
    const newCheckedItems = new Map(checkedItems);
  
    if (componentIndex !== undefined) {
      const key = `${serviceIndex}-${componentIndex}`;
      newCheckedItems.set(key, !newCheckedItems.get(key));
    } else {
      // Toggle the service's checked state
      const components = data.services[serviceIndex].components;
      if (components.length === 0) {
        if (data.services[serviceIndex].id in checkedServices) {
          setCheckedServices(prevObject => {
            const newObject = { ...prevObject };
            delete newObject[data.services[serviceIndex].id];
            return newObject;
          });
        } else {
          setCheckedServices(prevObject => ({
            ...prevObject,
            [data.services[serviceIndex].id]: true,
          }));
        }
        
      } else {
        for (let i = 0; i < components.length; i++) {
          const key = `${serviceIndex}-${i}`;
          newCheckedItems.set(key, !newCheckedItems.get(key));
        }
      }
    }
  
    setCheckedItems(newCheckedItems);
  
  };

  // Function to check if all checkboxes in a service are checked
  const isServiceChecked = (serviceIndex: number) => {
    const components = data.services[serviceIndex].components;
    if (components.length === 0) {
      
      if (data.services[serviceIndex].id in checkedServices) {
        return true
      }
        return false
    } else {
      const checked = (data.services[serviceIndex].components.every((_:any, i:any) =>
      checkedItems.get(`${serviceIndex}-${i}`)
      ));
      return checked
    }
  };

  // Function to check if some checkboxes in a service are checked
  const isServiceIndeterminate = (serviceIndex: number) => {
    const checkedCount = data.services[serviceIndex].components.reduce((count: any, _:any, i:any) => {
      const isChecked = checkedItems.get(`${serviceIndex}-${i}`);
      return count + (isChecked ? 1 : 0);
    }, 0);
    
    return checkedCount > 0 && checkedCount < data.services[serviceIndex].components.length;
  };

  const onSave = async () => {
    if (checkedItems.size <= 0 && Object.keys(checkedServices).length === 0) {
      toast({
        title: 'Success',
        description: 'No sub services checked.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        for (let i = 0; i < data.services.length; i++) {
          if (isServiceChecked(i)) {
            console.log("service checked");
            await supabase
              .from('user_subscriptions')
              .insert({
                provider_id: data.id,
                service_id: data.services[i].id,
                provider_name: data.name,
                organization_id: userData?.organization.id,
                email: userData?.organization.email,
                webHook_url: userData?.organization.webhook_url
              });
            console.log("Service subscription added");
            //add service to user_subscription
            for (let j = 0; j < data.services[i].components.length; j++) {
              await supabase
                .from('user_subscriptions')
                .insert({
                  provider_id: data.id,
                  component_id: data.services[i].components[j].id,
                  provider_name: data.name,
                  organization_id: userData?.organization.id,
                  email: userData?.organization.email,
                  webHook_url: userData?.organization.webhook_url
                });
              console.log("component subscription added");
            }
          } else {
            for (let j = 0; j < data.services[i].components.length; j++) {
              if (checkedItems.get(`${i}-${j}`)) {
                await supabase
                  .from('user_subscriptions')
                  .insert({
                    provider_id: data.id,
                    component_id: data.services[i].components[j].id,
                    provider_name: data.name,
                    organization_id: userData?.organization.id,
                    email: userData?.organization.email,
                    webHook_url: userData?.organization.webhook_url
                  });
                console.log("component subscription added");
              }
            }
          }
        
        }
        toast({
          title: 'Success',
          description: 'Sub services are being monitored.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error',
          description: 'Please enter both email and password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      
      
    }
    return true;
  };

 
  return (
    <Box
      w="670px"
      h="auto"
      px={8}
      py={5}
      bg="white"
      rounded="lg"
      border="1px"
      borderColor="gray.100"
      justifyContent="start"
      alignItems="start"
      gap={4}
      mt="35"
    >
      <Flex align="center">
        <Text
          textAlign="center"
          color="stone-950"
          fontSize="2xl"
          fontWeight="bold"
          marginRight="auto"
        >
          Select Services
        </Text>
        <Button
          px={6}
          py={2}
          colorScheme="blue.900"
          bgGradient="linear(to-r, blue.800, blue.700)"
          rounded="md"
          color="white"
          fontSize="base"
          fontWeight="medium"
          onClick={onSave}
        >
          Save changes
        </Button>
      </Flex>
      {data?.services?.map((service: any, serviceIndex: number) => (
        <Box key={serviceIndex}>
          <Box
            w="606px"
            h="12"
            px="4"
            py="3"
            rounded="lg"
            border="1px"
            borderColor="gray.300"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="25px"
          >
            <Flex align="center">
              <Text color="stone-950" fontSize="base" lineHeight="normal">
                {service.name}
              </Text>
            </Flex>
            <Checkbox
              isChecked={isServiceChecked(serviceIndex)}
              isIndeterminate={isServiceIndeterminate(serviceIndex)}
              onChange={() => toggleCheckbox(serviceIndex)}
              position="relative"
            />
          </Box>
          <Box pl="16">
          {service.components.map((component: any, componentIndex: number) => (
            <Box
              key={componentIndex}
              w="542px"
              h="12"
              px="4"
              py="3"
              rounded="lg"
              border="1px"
              borderColor="gray.300"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="5px"
              pl="16"
            >
              <Flex justify="flex-end" align="center">
                <Text color="stone-950" fontSize="base" lineHeight="normal">
                  {component.name}
                </Text>
              </Flex>
              <Checkbox
                isChecked={checkedItems.get(`${serviceIndex}-${componentIndex}`)}
                onChange={() => toggleCheckbox(serviceIndex, componentIndex)}
                w="6"
                h="6"
                position="relative"
              />
            </Box>
          ))}
            </Box>
        </Box>
      ))}
      <Divider my="15px" />
    </Box>
  );
};

export default ServiceSettings;
