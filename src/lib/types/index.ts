import type { OnboardingFormType } from '../hooks/form/onboarding-form';

export type StoreType = {
  onboarding?: OnboardingFormType;
};

export type StepComponentProps = {
  cb: () => (args: Partial<OnboardingFormType>) => void;
};

export type SVGIconType = {
  width?: number;
  color?: string;
};
