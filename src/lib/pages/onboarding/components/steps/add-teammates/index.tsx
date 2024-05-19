/* eslint-disable react/no-array-index-key */
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import StepFooter from '../../StepFooter';
import { TextLikeButton } from '~/lib/components/button';
import FormInput from '~/lib/components/form/FormInput';
import Label from '~/lib/components/label';
import FadeIn from '~/lib/components/motion/fade-in';
import type { StepComponentProps } from '~/lib/types';
import supabase from '../../../../../supabase';
import plans, { Plan, Plans } from '~/lib/hooks/plan-restrictions'; 

type AddTeammatesProps = {
  selectedPlan?: {
    name?: string;
    checkoutLink?: string;
  };
  initialValue?: string[];
  orgData?: any
};
const AddTeammates = ({
  selectedPlan,
  cb,
  initialValue,
  orgData
}: StepComponentProps & AddTeammatesProps) => {
  const [mates, setMates] = useState<string[]>(initialValue || []);
  const inputRef = useRef<HTMLInputElement>(null);


  function getSelectedPlan(planName: string | undefined): Plan {
    if (planName === "starter" || planName === "pro") {
        return plans[planName as keyof Plans]; // Accessing the plan dynamically using bracket notation
    }
    return plans["starter"]; // Return null for invalid plan names
  }

    // Get the selected plan based on the plan name
    const planRestriction: Plan = getSelectedPlan(selectedPlan?.name);
  const addTeamMate = () => {
    if (!inputRef.current) {
      return;
    }
    
    if (inputRef.current.reportValidity()) {
      setMates([...mates, inputRef.current.value]);
      inputRef.current.value = '';
    }
  };
  const removeTeamMate = (mate: string) => {
    const matesCopy = [...mates];
    const index = matesCopy.indexOf(mate);
    if (index !== -1) {
      matesCopy.splice(index, 1);
      setMates(matesCopy);
    }
  };

  const addTeam = async(email: string) => {
    const { data, error } = await supabase.functions.invoke("invite-to-org", {
      body: {user_id: orgData.userId ,email ,organization_id: orgData.userId },
    })
  };
  const moveToNextStep = () => {
    for (const item of mates) {
      addTeam(item)
    }
    cb()({ teammates: mates, step: 4 });
    window.location.href =
      'https://sentinelco.lemonsqueezy.com/buy/f69a9748-a103-4806-929a-cf94f0820641';
  };

  return (
     <FadeIn>
      <Heading size="md" m={8} textAlign="center">
        Add members of your team
      </Heading>
      <VStack maxWidth="xs">
        <Flex wrap="wrap" gap={1.5}>
          {mates.map((value, index) => (
            <Label
              key={index}
              label={value}
              showCloseButton
              onClose={() => removeTeamMate(value)}
              bgColor="brand.primary.700"
              fontSize="small"
              closeButtonSize="sm"
              fontWeight="medium"
            />
          ))}
        </Flex>
        <FormInput
          label="Email"
          inputProps={{
            type: 'email',
            placeholder: 'Email',
            p: 2,
            bgColor: 'whiteAlpha.500',
          }}
          required
          inputRef={inputRef}
          isDisabled={mates.length >= planRestriction.max_teammates} // Disable input if max teammates limit reached
        >
          <TextLikeButton
            onClick={addTeamMate}
            lineHeight="150%"
            fontSize="small"
            //isDisabled={mates.length >= planRestriction.max_teammates} // Disable button if max teammates limit reached
          >
            Add another teammate
          </TextLikeButton>
        </FormInput>
      </VStack>
      <Text textAlign="center" mt={10} fontWeight="medium">
        You will be charged
        <br />
        <Text as="span" fontWeight="bold">
          $6/month
        </Text>
      </Text>
      <StepFooter
        m={4}
        clickHandler={moveToNextStep}
        buttonText="Proceed to payment"
      />
    </FadeIn>
  );
};

export default AddTeammates;
