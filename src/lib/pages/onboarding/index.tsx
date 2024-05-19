// Onboarding.tsx
import { VStack, HStack, Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useState, useEffect } from 'react';

import supabase from '../../supabase';
import ChakraLink from '~/lib/components/ChakraLink';
import FallBackBox from '~/lib/components/fallback-box';
import Logo from '~/lib/components/Logo';
import SuccessIcon from '~/lib/components/success-icon';
import type { OnboardingFormType } from '~/lib/hooks/form/onboarding-form';
import useOnboardingForm from '~/lib/hooks/form/onboarding-form';
import { useMultiStepForm } from '~/lib/hooks/stepper';

import AddSoftware from './components/steps/add-software';
import AddTeammates from './components/steps/add-teammates';
import NotificationMethod from './components/steps/notification-methods';
import Payment from './components/steps/payment';
import SelectPlan from './components/steps/select-plan';

const stepLabels = [
  'Select plan',
  'Add third-party software',
  'Select notification method',
  'Add teammates',
  'Payment',
];

const OnboardingComplete = () => {
  return (
    <VStack>
      <Heading size="md" m={8} textAlign="center">
        Payment Successful
      </Heading>
      <SuccessIcon />
    </VStack>
  );
};

const Onboarding = () => {
  const { form, updateForm, clearForm } = useOnboardingForm();
  const { step, nextStep, Stepper } = useMultiStepForm({
    currentStep: form.step,
    stepLabels,
  });
  const [orgData, setOrgData] = useState<any>();

  const moveToNextStep = () => {
    // Updates the form and moves to the next step
    return (args: Partial<OnboardingFormType>) => {
      updateForm(args);
      nextStep();
    };
  };

  const endOnboarding = () => {
    clearForm();
    localStorage.removeItem('multiStepFormStep');
    nextStep();
  };

  const stepsMapping = [
    <SelectPlan cb={moveToNextStep} initialValue={form.plan} />,
    <AddSoftware
      cb={moveToNextStep}
      initialValue={form.softwares}
      orgData
      selectedPlan={form.plan}
    />,
    <NotificationMethod
      cb={moveToNextStep}
      initialValue={form.notificationMethods}
      selectedPlan={form.plan}
    />,
    <AddTeammates
      cb={moveToNextStep}
      initialValue={form.teammates}
      orgData
      selectedPlan={form.plan}
    />,
    <Payment
      cb={endOnboarding}
      initialValue={form.payment}
      selectedPlan={form.plan}
    />,
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log('Auth User data:', user);

        const { data: userData } = await supabase
          .from('users')
          .select('*, organization(*)')
          .eq('id', user?.id)
          .single();
        setOrgData({ orgId: userData.organization.id, userId: userData.id });
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    getData();
  }, []);

  if (step === undefined) {
    // To reduce amount of jumps we get on reload
    return <FallBackBox boxProps={{ height: '100vh' }} showLogo />;
  }

  return (
    <VStack>
      <NextSeo title="Onboarding" />
      <HStack p={{ base: 3 }} width="full" justify="space-between">
        <Logo width={120} />
        <ChakraLink
          color="brand.primary.900"
          fontWeight="bold"
          href="/login"
          onClick={endOnboarding}
        >
          Log in
        </ChakraLink>
      </HStack>
      <Stepper />
      {step < stepLabels.length ? stepsMapping[step] : <OnboardingComplete />}
    </VStack>
  );
};

export default Onboarding;
