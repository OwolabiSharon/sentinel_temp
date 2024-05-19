/* eslint-disable react/no-array-index-key */
import { Box, useToken } from '@chakra-ui/react';
import { Stepper, Step } from 'react-form-stepper';

import FadeIn from '../motion/fade-in';
import useDeviceType from '~/lib/hooks/device-type';

type OnboardingStepperProps = {
  step: number;
  stepLabels: string[];
};

const OnboardingStepper = ({ step, stepLabels }: OnboardingStepperProps) => {
  const [blue, lighterBlue, gray400, gray300] = useToken('colors', [
    'brand.primary.900',
    'blue.600',
    'gray.400',
    'gray.300',
  ]);
  const { isMobile } = useDeviceType();
  return (
    <Box width="full" height={{ base: 28 }} display="block">
      <FadeIn>
        <Stepper
          style={{
            width: '100%',
          }}
          activeStep={step}
          styleConfig={{
            activeBgColor: lighterBlue,
            activeTextColor: 'white',
            completedBgColor: blue,
            completedTextColor: 'white',
            inactiveBgColor: gray300,
            inactiveTextColor: gray400,
            borderRadius: '50%',
            circleFontSize: '0.8rem',
            size: '2.5rem',
            labelFontSize: '0.8rem',
            fontWeight: '600',
          }}
          connectorStyleConfig={{
            size: 1,
            disabledColor: gray300,
            activeColor: '#897274',
            completedColor: blue,
            style: 'solid',
            stepSize: '2.2rem',
          }}
        >
          {stepLabels.map((value, index) => (
            <Step key={index} label={isMobile ? '' : value} />
          ))}
        </Stepper>
      </FadeIn>
    </Box>
  );
};

export default OnboardingStepper;
