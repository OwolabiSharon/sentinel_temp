// useMultiStepForm.ts
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Stepper = dynamic(() => import('../../components/stepper'), {
  ssr: false,
});

type UseMultiStepFormProps = {
  currentStep?: number;
  stepLabels: string[];
};

export const useMultiStepForm = ({
  currentStep,
  stepLabels,
}: UseMultiStepFormProps) => {
  const [step, setStep] = useState<number | undefined>(0);

  useEffect(() => {
    const storedStep = localStorage.getItem('multiStepFormStep');
    if (currentStep) {
      setStep(currentStep);
    } else if (storedStep) {
      setStep(parseInt(storedStep, 10));
    }
  }, [currentStep]);

  const nextStep = () => {
    if (step !== undefined && step < stepLabels.length) {
      setStep(step + 1);
      localStorage.setItem('multiStepFormStep', String(step + 1));
    }
  };

  const prevStep = () => {
    if (step !== undefined && step > 0) {
      setStep(step - 1);
      localStorage.setItem('multiStepFormStep', String(step - 1));
    }
  };

  const Form = () => <Stepper step={step || 0} stepLabels={stepLabels} />;

  return { step, nextStep, prevStep, Stepper: Form };
};
