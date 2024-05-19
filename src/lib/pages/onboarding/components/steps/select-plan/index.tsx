/* eslint-disable react/no-array-index-key */
import { Flex, Heading, RadioGroup, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import FadeIn from '../../../../../components/motion/fade-in';
import type { StepComponentProps } from '../../../../../types';
import StepFooter from '../../StepFooter';

import PlanBox from './PlanBox';

type SelectPlanProps = {
  initialValue?: {
    name?: string;
    checkoutLink?: string;
  };
};
const SelectPlan = ({
  cb,
  initialValue,
}: StepComponentProps & SelectPlanProps) => {
  const [plan, setPlan] = useState(initialValue?.name || '');
  const [planCheckout, setPlanCheckout] = useState('');
  const handleClick = () =>
    cb()({ plan: { name: plan, checkoutLink: planCheckout }, step: 1 });
  return (
    <FadeIn
      props={{
        width: 'full',
        px: { base: 4 },
      }}
    >
      <Flex direction="column" justify="center">
        <Heading size="md" m={8} textAlign="center">
          Select a Payment Plan
        </Heading>
        <RadioGroup value={plan} onChange={setPlan} colorScheme="blue">
          <VStack>
            <PlanBox
              value="free"
              currentValue={plan}
              head={['Starter', 'Free Forever']}
              subTexts={[
                'Monitor up to 15 third-party services',
                'Email Notifications',
              ]}
              updateValue={() => {
                setPlan('free');
                setPlanCheckout(
                  'https://sentinelco.lemonsqueezy.com/buy/f69a9748-a103-4806-929a-cf94f0820641'
                );
              }}
            />

            <PlanBox
              value="pro"
              currentValue={plan}
              head={['Pro', '$3 per user/month']}
              subTexts={[
                'Monitor unlimited third-party services',
                'Email and Websocket Notifications',
                'Email Notifications',
              ]}
              updateValue={() => {
                setPlan('Pro');
                setPlanCheckout(
                  'https://sentinelco.lemonsqueezy.com/buy/f69a9748-a103-4806-929a-cf94f0820641'
                );
              }}
            />
          </VStack>
        </RadioGroup>
      </Flex>
      <StepFooter clickHandler={handleClick} disabled={plan === ''} />
    </FadeIn>
  );
};

export default SelectPlan;
