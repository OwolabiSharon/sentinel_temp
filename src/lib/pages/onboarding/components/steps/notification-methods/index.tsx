/* eslint-disable react/no-array-index-key */
import {
  CheckboxGroup,
  Heading,
  Text,
  VStack,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';

import StepFooter from '../../StepFooter';
import { TextLikeButton } from '~/lib/components/button';
import { CheckCard, ComingSoonNotificationCard } from '~/lib/components/card';
import SuggestNotificationMethodModal from '~/lib/components/modals/SuggestNotificationMethodModal';
import FadeIn from '~/lib/components/motion/fade-in';
import TestWebHook from '~/lib/components/test-webhook';
import useNotificationMethods from '~/lib/hooks/notificationMethods';
import type { StepComponentProps } from '~/lib/types';

type NotificationMethodProps = {
  initialValue?: string[];
};
const NotificationMethod = ({
  cb,
  initialValue,
}: StepComponentProps & NotificationMethodProps) => {
  const [modalState, { on: showModal, off: closeModal }] = useBoolean(false);
  const [notificationMethods] = useNotificationMethods();
  const [methods, setMethods] = useState<(number | string)[]>(
    initialValue || []
  );
  const handleClick = () =>
    cb()({ notificationMethods: methods as string[], step: 3 });
  return (
    <FadeIn
      props={{
        width: 'full',
        px: { base: 4 },
      }}
    >
      <VStack>
        <Heading size="md" mt={8} mb={5} textAlign="center">
          Select your preferrred notification methods
        </Heading>
        <VStack
          justify="center"
          fontSize="small"
          pb={5}
          width={{ base: 'full', md: 'sm' }}
          mx={4}
        >
          <CheckboxGroup onChange={setMethods} value={methods}>
            <VStack
              wrap="wrap"
              width="full"
              justify={{ base: 'center' }}
              fontSize="small"
            >
              {notificationMethods.map((value, index) =>
                value.name.toLowerCase() === 'webhook' ? (
                  <CheckCard
                    key={index}
                    name={value.name}
                    icon={value.icon}
                    width={{ base: 'full' }}
                    showContentWhenChecked={<TestWebHook />}
                  />
                ) : (
                  <CheckCard
                    key={index}
                    name={value.name}
                    icon={value.icon}
                    width={{ base: 'full' }}
                  />
                )
              )}
              <ComingSoonNotificationCard
                name={notificationMethods[0].name}
                icon={notificationMethods[0].icon}
                width="full"
              />
            </VStack>
          </CheckboxGroup>
          <Text
            fontWeight="medium"
            width="full"
            textAlign={{ base: 'unset', md: 'center' }}
          >
            Can&apos;t find your preferred notification method?{' '}
            <TextLikeButton onClick={showModal} as="span" lineHeight="150%">
              Let us know
            </TextLikeButton>
          </Text>
        </VStack>
      </VStack>

      <StepFooter
        m={8}
        clickHandler={handleClick}
        disabled={methods.length === 0}
        enableSkipBtn={methods.length === 0}
      />
      <SuggestNotificationMethodModal
        isOpen={modalState}
        onClose={closeModal}
      />
    </FadeIn>
  );
};

export default NotificationMethod;
