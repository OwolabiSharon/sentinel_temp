/* eslint-disable react/no-array-index-key */
import { Text, Icon, Flex, useBoolean } from '@chakra-ui/react';
import { useCallback, useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import supabase from '../../../../../../supabase';
import { TextLikeButton } from '~/lib/components/button';
import FallBackBox from '~/lib/components/fallback-box';
import useServices from '~/lib/pages/dashboard/hooks';

import ServiceDetailsHeader from './service-details-header';
import ServiceFeed from './service-feed';
import ServiceSettingsModal from './service-settings-modal';
import SubServiceList from './sub-service-list';
import SubServiceSettings from './sub-service-list/settings';

type ServiceDetailsProps = {
  data: any;
  cb: (name: string | null) => void;
};
const ServiceDetails = ({ data, cb }: ServiceDetailsProps) => {
  const unMountComponent = useCallback(() => cb(null), [cb]);

  if (!data) {
    return <FallBackBox />;
  }

  return (
    <>
      <TextLikeButton
        onClick={unMountComponent}
        display="flex"
        alignItems="center"
        mb={{ base: 8 }}
        fontWeight="medium"
      >
        <Icon as={BsArrowLeft} />
        <Text ml={{ base: 1.5 }} as="span">
          Dashboard home
        </Text>
      </TextLikeButton>
      <ServiceDetailsHeader name={data.name} link={data.status_link} image_url= {data.icon_url} />
      <Flex
        wrap={{ base: 'wrap', md: 'unset' }}
        gap={{ base: 4 }}
        py={{ base: 6 }}
      >
        <ServiceFeed service={data} />
        <SubServiceList service={data} />
      </Flex>
    </>
  );
};

export default ServiceDetails;
