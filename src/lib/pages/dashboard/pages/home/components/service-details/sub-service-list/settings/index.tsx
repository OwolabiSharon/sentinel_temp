// eslint-disable-next-line import/no-extraneous-dependencies
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import supabase from '../../../../../../../../supabase';
import { TextLikeButton } from '~/lib/components/button';
import Wrapper from '~/lib/pages/dashboard/Wrapper';

import ServiceSettings from './ServiceSettings';

type SubServiceSettingsProps = {
  data: any;
  cb: (name: string | null) => void;
};

const SubServiceSettings = ({ data, cb }: SubServiceSettingsProps) => {
  const unMountComponent = useCallback(() => cb(null), [cb]);
  const [subServices, setSubServices] = useState<any>({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const selectedProviderId = localStorage.getItem('selectedProviderId');

    const fetchData = async () => {
      // Perform Supabase query to fetch user subscriptions
      const { data: providerData, error } = await supabase
        .from('providers')
        .select('id, name, services(id, name , components(id, name)) ')
        .eq('id', selectedProviderId);

      if (error) {
        console.error('Error fetching user subscriptions:', error.message);
        return;
      }

      console.log(providerData, 'settings response');

      // const formattedData = data.map((item: any) => {
      //   if (!item.services) {
      //     return item.components;
      //   }
      //   return item.services;
      // });
      setSubServices(providerData[0]);
    };
    fetchData();
  });

  const onClick = () => {
    router.push({
      pathname: '/dashboard',
    });
  };

  return (
    <Wrapper>
      <NextSeo title="Settings" />
      <TextLikeButton
        onClick={onClick}
        display="flex"
        alignItems="center"
        mb={{ base: 8 }}
        fontWeight="medium"
      >
        <Icon as={BsArrowLeft} />
        <Text ml={{ base: 1.5 }} as="span">
          Back
        </Text>
      </TextLikeButton>
      <Box
        w="493px"
        h="75px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="2"
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="2.5"
        >
          <Text fontSize="4xl" fontWeight="bold" color="stone-950">
            {subServices.name} Services
          </Text>
        </Box>
        <Text
          color="stone-950"
          fontWeight="semi-bold"
          fontSize="small"
          lineHeight="normal"
        >
          Add services and customise how you to get notifications on outages.
        </Text>
      </Box>
      <Box
        w="293px"
        h="34px"
        p="2"
        bgColor="gray.200"
        borderRadius="full"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap="2"
        mt="3.5"
      >
        <InfoOutlineIcon w="4" h="4" position="relative" />

        <Text color="neutral.600" fontSize="10px" lineHeight="18px">
          You can add up to 3 services as a basic plan user
        </Text>
      </Box>
      <ServiceSettings data={subServices} />
    </Wrapper>
  );
};

export default SubServiceSettings;
