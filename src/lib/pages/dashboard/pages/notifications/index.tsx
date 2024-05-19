/* eslint-disable react/no-array-index-key */
import {
  CheckboxGroup,
  Heading,
  VStack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import Wrapper from '../../Wrapper';
import { PrimaryButton, TextLikeButton } from '~/lib/components/button';
import { CheckCard, ComingSoonNotificationCard } from '~/lib/components/card';
import SuggestNotificationMethodModal from '~/lib/components/modals/SuggestNotificationMethodModal';
import TestWebHook from '~/lib/components/test-webhook';
import useNotificationMethods from '~/lib/hooks/notificationMethods';

const Notifications = () => {
  const [notificationMethods] = useNotificationMethods();
  const [methods, setMethods] = useState<(number | string)[]>([]);
  const [modalState, { on: showModal, off: closeModal }] = useBoolean(false);
  return (
    <Wrapper>
      <NextSeo title="Notification methods" />
      <Heading as="h2" size={{ base: 'md', md: 'md' }} mb={{ base: 8 }}>
        Notification Methods
      </Heading>
      <VStack width={{ base: 'full', md: 'md' }}>
        <VStack width={{ base: 'full', md: 'md' }}>
          <CheckboxGroup onChange={setMethods} value={methods}>
            <VStack
              width="full"
              fontSize="small"
              textTransform="capitalize"
              justify="start"
            >
              {notificationMethods.map((value, index) => {
                if (value.type?.toLowerCase() === 'coming soon') {
                  return (
                    <ComingSoonNotificationCard
                      key={index}
                      name={value.name}
                      icon={value.icon}
                      width={{ base: 'full' }}
                    />
                  );
                }
                if (value.name.toLowerCase() === 'webhook') {
                  return (
                    <CheckCard
                      key={index}
                      name={value.name}
                      icon={value.icon}
                      width={{ base: 'full' }}
                      showContentWhenChecked={<TestWebHook />}
                      cardProps={{
                        px: 5,
                        py: 4,
                      }}
                    />
                  );
                }
                return (
                  <CheckCard
                    key={index}
                    name={value.name}
                    icon={value.icon}
                    width={{ base: 'full' }}
                    cardProps={{
                      px: 5,
                      py: 4,
                    }}
                  />
                );
              })}
            </VStack>
          </CheckboxGroup>
        </VStack>

        <Text
          fontWeight="medium"
          fontSize={{ base: 'sm' }}
          width="full"
          pb={[8]}
        >
          Can&apos;t find your preferred notification method?{' '}
          <TextLikeButton onClick={showModal} fontWeight="bold" as="span">
            Let us know
          </TextLikeButton>
        </Text>
        <PrimaryButton isDisabled>Save changes</PrimaryButton>
      </VStack>
      <SuggestNotificationMethodModal
        isOpen={modalState}
        onClose={closeModal}
      />
    </Wrapper>
  );
};

export default Notifications;
