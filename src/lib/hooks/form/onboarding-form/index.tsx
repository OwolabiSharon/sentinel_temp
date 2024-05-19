import { useEffect, useState } from 'react';

import useStore from '../../store';

export type OnboardingFormType = {
  step?: number;
  plan: {
    name?: string;
    checkoutLink?: string;
  };
  softwares?: string[];
  notificationMethods?: string[];
  teammates?: string[];
  payment: boolean;
};

const defaultFormValues = {
  step: undefined,
  plan: {},
  payment: false,
};

const useOnboardingForm = () => {
  const { store, updateValueInStore } = useStore();
  const [form, setForm] = useState<OnboardingFormType>(defaultFormValues);
  useEffect(() => {
    // Fetch form data from sessionStorage if it exists
    const formInSession = store.onboarding;
    if (formInSession) {
      formInSession.step =
        formInSession.step !== undefined ? formInSession.step : 0;
      setForm(formInSession);
    }
  }, [store.onboarding]);

  const updateForm = (value: Partial<OnboardingFormType>) => {
    const updatedForm = { ...form, ...value };
    // updatedForm.step = updatedForm.step ? updatedForm.step : 0;
    // Persist form data in sessionStorage
    updateValueInStore({ onboarding: updatedForm });
    // console.log(updatedForm);
    setForm(updatedForm);
  };

  const clearForm = () => updateValueInStore({ onboarding: defaultFormValues });

  return { form, updateForm, clearForm };
};

export default useOnboardingForm;
