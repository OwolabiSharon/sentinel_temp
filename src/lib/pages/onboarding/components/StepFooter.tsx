import type { SpaceProps } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';

import { PrimaryButton, TextLikeButton } from '~/lib/components/button';

type StepFooterProps = {
  buttonText?: string;
  clickHandler: () => void;
  enableSkipBtn?: boolean;
  disabled?: boolean;
  m?: SpaceProps['m'];
};

const StepFooter = ({
  buttonText,
  enableSkipBtn,
  clickHandler,
  disabled,
  m,
}: StepFooterProps) => {
  return (
    <VStack m={m || 16}>
      <PrimaryButton isDisabled={disabled} onClick={clickHandler}>
        {buttonText || 'Continue'}
      </PrimaryButton>
      {enableSkipBtn && (
        <TextLikeButton onClick={clickHandler} fontSize="lg" fontWeight="bold">
          Skip
        </TextLikeButton>
      )}
    </VStack>
  );
};

export default StepFooter;
