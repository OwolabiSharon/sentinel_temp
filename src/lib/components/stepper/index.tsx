/* eslint-disable react/no-array-index-key */
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
} from '@chakra-ui/react';

import FadeIn from '../motion/fade-in';
import useDeviceType from '~/lib/hooks/device-type';

const getColor = (step: number, pos: number) => {
  if (step === pos) {
    return 'brand.primary.900';
  }

  return pos > step ? 'brand.darkGray.800' : 'brand.black';
};

const getClassName = (step: number, pos: number) => {
  if (step === pos) {
    return 'onboarding-stepper-step-active';
  }

  return pos > step
    ? 'onboarding-stepper-step-undone'
    : 'onboarding-stepper-step-done';
};

type OnboardingStepperProps = {
  step: number;
  stepLabels: string[];
};

const OnboardingStepper = ({ step, stepLabels }: OnboardingStepperProps) => {
  const { isMobile } = useDeviceType();
  return (
    <Box
      width="full"
      // my={{ base: 4 }}
      px={{ base: 8 }}
      height={{ base: 12, md: 24, lg: 20 }}
      overflowX="hidden"
    >
      <FadeIn props={{ height: 'full' }}>
        <Stepper index={step} columnGap={0} colorScheme="brand.blue">
          {stepLabels.map((value, index) => (
            <Step key={index} className="onboarding-stepper-step">
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={
                    <StepNumber className={getClassName(step, index)} />
                  }
                  active={<StepNumber className={getClassName(step, index)} />}
                />
              </StepIndicator>
              {!isMobile && (
                <Box
                  position="absolute"
                  top="100%"
                  transform="translateX(-40%)"
                  pt={{ base: 2 }}
                  width={{ base: '8rem', lg: '12rem' }}
                >
                  <Text
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="semibold"
                    color={getColor(step, index)}
                  >
                    {value}
                  </Text>
                </Box>
              )}
              <StepSeparator className="onboarding-stepper-seperator" />
            </Step>
          ))}
        </Stepper>
      </FadeIn>
    </Box>
  );
};

export default OnboardingStepper;
